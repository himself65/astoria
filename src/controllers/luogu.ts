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
    const formData = new FormData()
    forEach(params, (k, v) => {
      formData.append(k, v)
    })
    // @ts-ignore
    return axios.post('https://www.luogu.org/login/loginpage', formData).then(res => {
      return res.data
    })
  }
}
