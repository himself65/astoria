import * as FormData from 'form-data'
import axios from 'axios'
import * as forEach from 'lodash/forEach'
import { Controller, Post, Get, ContentType, QueryParams, Res } from 'routing-controllers'

interface ILuoguID {
  username: string,
  password: string,
  cookie: 3,
  verify: string,
  __client_id: string,
  _uid: number
}

@Controller()
export class LuoguController {
  @Post('/luogu/login')
  async loginLuogu (@QueryParams() params: ILuoguID) {
    const query = {
      username: params.username,
      password: params.password,
      cookie: 3,
      verify: params.verify
    }
    return axios.post('https://www.luogu.org/login/loginpage', query, {
      headers: {
        Cookie: '__client_id=' + params.__client_id + ';_uid=' + params._uid
      }
    }).then(res => {
      return res.data
    })
  }

  @Get('/luogu/captcha')
  async getCaptcha () {
    return axios.get('https://www.luogu.org/download/captcha').then(res => {
      const cookies = res.headers['set-cookie']
      let regex = /^__client_id=(\S*);/g
      const _0 = regex.exec(cookies[0])[1]
      regex = /^_uid=(\S*);/g
      const _1 = regex.exec(cookies[1])[1]
      return {
        '__client_id': _0,
        '_uid': _1,
        img: res.data
      }
    })
  }
}
