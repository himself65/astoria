import * as readFilePromise from 'fs-readfile-promise'
import * as loadFilePromise from 'fs-writefile-promise'
import { resolve } from 'path'
import { drawerPath } from '../../config.json'
import { Controller, Post, Body, Res } from 'routing-controllers'
import { isProd } from '../'

interface ILuoguID {
  username?: string,
  password?: string,
  cookie?: string,
  verify?: string
}

const drawerDataPath = isProd ?
  `${drawerPath}/users.json` :
  resolve(__dirname, '../', '../', 'dist', 'users.json')

@Controller()
export class LuoguController {
  @Post('/luogu/login')
  async loginLuogu (@Body() user: ILuoguID, @Res() res) {
    if (!/__client_id/.test(user.cookie)) {
      return {
        data: '请输入正确的信息'
      }
    } else {
      let data = await readFilePromise(drawerDataPath).then(res => JSON.parse(res.toString()))
      data.push({
        id: user.username,
        cookie: user.cookie
      })
      return loadFilePromise(drawerDataPath, JSON.stringify(data)).then(() => {
        return {
          data: 'success'
        }
      }).catch(() => {
        res.statusCode = 500
        return {
          data: 'error'
        }
      })
    }
  }
}
