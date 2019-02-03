import axios from 'axios'
import * as qs from 'querystring'
import { JsonController, Post, Body, Res, Get, QueryParams, Redirect, Ctx } from 'routing-controllers'
import { User } from '../models/user'
import { SecureCode } from '../models/secureCode'
import { ClientID, ClientSecret } from '../../config.private.json'

interface ILogin {
  username: string
  password: string
}

const GithubAuthorizeUrl = 'https://github.com/login/oauth/authorize?'

@JsonController()
export default class UserController {

  @Post('/login')
  async login (
    @Body() body: ILogin,
    @Res() res) {
    const { username, password } = body
    await User.findOne({
      username: username,
      password: password
    }).lean(true).then(res => {
      if (!res) {
        return {
          error: '用户不存在'
        }
      } else {
        return {
          data: res
        }
      }
    })
  }

  @Post('/logout')
  async logout (
    @Res() res) {
    // todo
    res.statusCode = 404
  }

  @Get('/login/auth/github')
  @Redirect('/')
  async loginWithGithub (@Body() body, @Ctx() ctx) {
    const date = Date.parse(new Date().toUTCString())
    return SecureCode.create({
      content: date
    }).then(res => {
      if (!res) {
        throw Error('Can not create SecureCode')
      }
      const query = {
        client_id: ClientID,
        state: date
      }
      return GithubAuthorizeUrl + qs.stringify(query)
    }).catch(err => {
      throw err
    })
  }

  @Get('/login/auth/github/callback')
  @Redirect('/')
  redirectUrl (@Res() response, @QueryParams() query) {
    const { code, state } = query
    const path = 'https://github.com/login/oauth/access_token'
    const params = {
      client_id: ClientID,
      client_secret: ClientSecret,
      code: code
    }
    return SecureCode.findOne({
      content: state
    }).then(async docs => {
      if (!docs) {
        // 找不到保存到数据库的code
        // hack: 仅仅在非生产环境中跳过
        response.statusCode = 400
        return {
          error: '找不到code，请重试'
        }
      } else {
        try {
          const token = await axios.post(path, params).then(async res => {
            if (res.status !== 200) {
              throw res.data
            }
            const { error = null, access_token } = qs.parse(res.data)
            if (error) throw res.data
            return access_token
          })
          return axios.get('https://api.github.com/user?access_token=' + token).then(async res => {
            const { id } = res.data
            await User.findOne({
              githubID: parseInt(id, 10)  // find user with GitHubID
            }).then(res => {
              console.log(res)
              if (!res) {
                // can't find user
                // register or bind new use
                return `/register`
              } else {
                // find user
                // set state
                return '/'  // todo
              }
            })
          })
        } catch (error) {
          console.error(error)
        }
      }
    })
  }
}
