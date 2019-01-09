import * as passport from 'koa-passport'
import * as GitHubStrategy from 'passport-github'
import * as LocalStrategy from 'passport-local'
import { User } from './models/user'

interface IUser {
  id: string
}

passport.serializeUser((user: IUser, done) => {
  done(null, user.id)
})

passport.deserializeUser(function (id: string, done) {
  User.findById(id).lean(true).then(user => {
    if (user.id) {
      done(null, user)
    } else {
      done(user.errors, null)
    }
  })
})

passport.use(new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password',
  passReqToCallback: true
}, function (req, username, password, done) {
  User.findOne({
    'username': username
  }).lean(true).then(user => {
    if (!user) {
      return done(null, false, { message: 'user does not exist' })
    }
    return done(null, user.get())
  }).catch(function () {
    return done(null, false)
  })
}))

import {
  ClientID as GITHUB_CLIENT_ID,
  ClientSecret as GITHUB_CLIENT_SECRET
} from '../config.private.json'

import { port } from '../config.json'

passport.use(new GitHubStrategy({
  clientID: GITHUB_CLIENT_ID,
  clientSecret: GITHUB_CLIENT_SECRET,
  callbackURL: `http://127.0.0.1:${port}/api/login/auth/github/callback`
}, (accessToken, refreshToken, profile, cb) => {
  User.findOne({ githubId: profile.id }, function (err, user) {
    return cb(err, user)
  })
}))
