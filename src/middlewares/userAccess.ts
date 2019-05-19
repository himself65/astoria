import { Context, Daruk } from 'daruk'
import passport = require('koa-passport')
import { Strategy } from 'passport-local'
import { UserModel } from '../models'

export default function (daruk: Daruk) {
  passport.serializeUser(async (user) => {
    // todo
  })

  passport.deserializeUser(async id => {
    // todo
  })

  passport.use(new Strategy(async (username, password, done) => {
    const res = await UserModel.findOne({ username, password })
    if (res) {
      done(null, res)
    } else {
      done(`${username} not found`)
    }
  }))

  return async function (ctx: Context, next: Function) {
    // todo
  }
}
