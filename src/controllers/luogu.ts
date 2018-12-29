import * as FormData from 'form-data'
import axios from 'axios'
import * as forEach from 'lodash/forEach'
import { Controller, Post, Get, ContentType, QueryParams, Res } from 'routing-controllers'

interface ILuoguID {
  username: string,
  password: string,
  cookie: 3,
  verify: string
}

@Controller()
export class LuoguController {
  @Post('/luogu/login')
  async loginLuogu (@QueryParams() params: ILuoguID) {
    return axios.post('https://www.luogu.org/login/loginpage', params).then(res => {
      return res.data
    })
  }
}
