import axios from 'axios'
import * as crypto from 'crypto-js'
import { debug } from '../'
import * as qs from 'querystring'
import { JsonController, Post, Body, Res, Get, QueryParams, Redirect, Ctx, Req } from 'routing-controllers'
import { User } from '../models/user'
import { SecureCode } from '../models/secureCode'
import { ClientID, ClientSecret } from '../../config.private.json'
import { regexToken } from '../utils/userAccess'
import { UserPermission } from '../utils/shared'

interface ILogin {
  username: string
  password: string
}

export const timeoutDurationDays = 5
export const GithubAuthorizeUrl = 'https://github.com/login/oauth/authorize?'

@JsonController()
export default class UserController {

  @Get('/user')
  async getCurrentUser (@Req() req) {
    // wtf: https://github.com/typestack/routing-controllers/issues/471
    const authorization = req.headers['authorization'] || ''
    let token = null
    if (regexToken.test(authorization)) {
      token = regexToken.exec(authorization)[0]
    }
    if (!token) {
      return {
        data: null
      }
    }
    debug('/api/user', token)
    return User.findOne({
      password: token
    }).select('username nickname level')
      .lean(true)
      .then(res => {
        debug('/api/user', res)
        return {
          data: {
            ...res,
            level: UserPermission[res.level]
          }
        }
      })
  }

  @Post('/login')
  async login (
    @Body() body,
    @Res() response) {
    debug(body)
    const { username, password } = body
    if (!username || !password) {
      return '/error'
    }
    return User.findOne({
      username: username
    }).lean(true).then(async res => {
      const pw = crypto.PBKDF2(password, res.sale).toString()
      debug(res.password, pw)
      if (res.password === pw) {
        // 密码正确
        const after = new Date()
        after.setDate(after.getDate() + timeoutDurationDays)
        const token = `${pw}-${Date.parse(after.toString())}`
        return {
          data: token
        }
      } else {
        return {
          error: '请重新检查您的账号或密码'
        }
      }
    })
  }

  @Get('/logout')
  @Redirect('/')
  async logout (
    @Res() res) {
    const token = res.headers['authorization']
    await User.findOneAndUpdate(
      { token: token },
      { token: '' })
      .then(res => {
        console.log(arguments)
      })

  }

  // todo
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
    debug(code, state)
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
              debug(res)
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
