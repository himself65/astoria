import { drawerPath } from '../../config.json'
import { Controller, Post, Get, ContentType, QueryParams, Res } from 'routing-controllers'

interface ILuoguID {
  username?: string,
  password?: string,
  cookie?: string,
  verify?: string
}

// fixme: 写数据库
const drawerDataPath = `${drawerPath}/users.json`

@Controller()
export class LuoguController {
  @Post('/luogu/login')
  async loginLuogu (@QueryParams() params: ILuoguID) {
    /__client_id/.test(params.cookie)
    // todo
  }
}
