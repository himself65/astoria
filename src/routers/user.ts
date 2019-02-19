import * as KoaRouter from 'koa-router'
import { debug } from '../index'
import { User } from '../models/user'

// todo
export const router = new KoaRouter()

router.get('/api/user/current', async (ctx) => {
  const { username } = ctx.user
  ctx.response.body = await User.findOne({
    username: username
  }).select('username nickname level')
    .lean(true)
    .then(res => {
      debug('/api/user', res)
      return {
        data: res
      }
    })
})

export default router
