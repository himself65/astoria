import * as readFilePromise from 'fs-readfile-promise'
import * as loadFilePromise from 'fs-writefile-promise'
import { resolve } from 'path'
import { drawerPath } from '../../config.json'
import { Controller, Post, QueryParams, Res } from 'routing-controllers'
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
  async loginLuogu (@QueryParams() params: ILuoguID, @Res() res) {
    if (!/__client_id/.test(params.cookie)) {
      return {
        data: '请输入正确的信息'
      }
    } else {
      let data = await readFilePromise(drawerDataPath).then(res => JSON.parse(res))
      data.push({
        id: params.username,
        cookie: params.cookie
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
