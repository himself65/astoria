import { all, BaseController, Context } from 'daruk'
import { debug } from '../index'
import { UserPermission } from '../utils/shared'

export default class AccessRequired extends BaseController {
  @all('(backstage|new)')
  async accessRequired (ctx: Context, next) {
    if (ctx.user.level === UserPermission.default) {
      ctx.response.redirect('/error')
    }
    await next()
  }

  @all('/user')
  async loginRequired (ctx, next) {
    if (ctx.user.username === null) {
      debug(ctx.user)
      ctx.response.redirect('/error')
    }
    await next()
  }
}
