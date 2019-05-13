import axios from 'axios'
import * as crypto from 'crypto-js'
import { BaseController, Context, get, json, post, redirect } from 'daruk'
import * as qs from 'querystring'
import { debug } from '../'
import { ClientID, ClientSecret } from '../../config.private.json'
import { SecureCode } from '../models/secureCode'
import { UserModel } from '../models/user'
import { regexToken } from '../plugins/userAccess'

export const timeoutDurationDays = 5
export const GithubAuthorizeUrl = 'https://github.com/login/oauth/authorize?'

export default class User extends BaseController {
  @get('/user')
  @json()
  async getUser (ctx: Context) {
    const authorization = ctx.req.headers['authorization'] || ''
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
    return UserModel.findOne({
      password: token
    }).select('username nickname level')
      .lean(true)
      .then(res => {
        debug('/api/user', res)
        return {
          data: res
        }
      })
  }

  @post('/login')
  @json()
  async login (ctx: Context) {
    const body = ctx.body
    debug(body)
    const { username, password } = body
    if (!username || !password) {
      return '/error'
    }
    return UserModel.findOne({
      username: username
    }).lean(true).then(async res => {
      const pw = crypto.PBKDF2(password, res.sale).toString()
      debug(res.password, pw)
      if (res.password === pw) {
        // 密码正确
        const after = new Date()
        after.setDate(after.getDate() + timeoutDurationDays)
        const token = `${pw}-${Date.parse(after.toString())}`
        ctx.cookies.set('token', token)
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

  async logout (ctx: Context) {
    const token = ctx.request.headers['authorization']
    await UserModel.findOneAndUpdate(
      { token: token },
      { token: '' })
      .then(res => {
        console.log(arguments)
      })
    ctx.redirect('/')
  }

  // todo
  @get('/login/auth/github')
  async loginWithGithub (ctx: Context) {
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

  @get('/login/auth/github/callback')
  @redirect('/')
  redirectUrl (ctx: Context) {
    const { code, state } = ctx.query
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
        ctx.status = 400
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
            await UserModel.findOne({
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

  @get('/api/user/current')
  async getCurrentUser (ctx: Context, next) {
    const { username } = ctx.user
    ctx.response.body = await UserModel.findOne({
      username: username
    }).select('username nickname level')
      .lean(true)
      .then(res => {
        debug('/api/user', res)
        return {
          data: res
        }
      })
  }
}
