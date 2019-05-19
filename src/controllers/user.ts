import { BaseController, Context, get, json, post } from 'daruk'

export const timeoutDurationDays = 5
export const GithubAuthorizeUrl = 'https://github.com/login/oauth/authorize?'

export default class User extends BaseController {
  @get('')
  @json()
  async getUser (ctx: Context) {
    // todo
  }

  @post('/login')
  @json()
  async login (ctx: Context) {
    // todo
  }

  @get('/current')
  @json()
  async getCurrentUser (ctx: Context, next) {
    // todo
  }
}
