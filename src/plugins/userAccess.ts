import * as Koa from 'koa'
import { isObject } from 'lodash'
import { debug } from '../index'
import { IUser, User } from '../models/user'
import { UserPermission } from '../utils/shared'

export const regex = /^\/?[^.]+$/

export const regexToken = /[\S]+(?=-)/
export const regexTimeout = /(?<=-)[1-9]+/

export const plugin = {
  name: 'UserAccess',
  priority: 1,
  register: (app: Koa, config) => {

  }
}
