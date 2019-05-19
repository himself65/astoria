import * as crypto from 'crypto-js'
import * as mongoose from 'mongoose'
import { debug } from '../'
import { UserPermission } from '../utils/shared'
import { IQuery } from './'

type Document = mongoose.Document

const Schema = mongoose.Schema

/**
 * @param username 用户名，不可更改，不可重复
 * @param nickname 昵称，可随意修改
 * @param password 密码，加密后保存
 */
export const UserSchema = new Schema({
  username: { type: String, required: true, index: true },
  nickname: { type: String, required: true },
  password: { type: String, required: true },
  githubID: { type: Number, unique: true },

  email: String,
  level: {
    type: Number,
    enum: UserPermission,
    default: UserPermission.default
  },
  token: {
    type: String,
    unique: true,
    required: false
  },
  sale: { type: String, default: () => crypto.lib.WordArray.random(128 / 8) }
})

export interface IUser extends Document {
  username: string
  nickname: string
  email: string
  githubID: number
  level: number
  password: string | crypto.WordArray
  sale: string
}

UserSchema.pre<IUser>('save', function (next) {
  if (this.isNew) {
    this.password = crypto.PBKDF2(this.password.toString(), this.sale)
  }
  next()
})

export const UserModel = mongoose.model<IUser>('UserModel', UserSchema)
export default UserModel

export async function createExample () {
  await UserModel.create({
    username: 'himself65',
    nickname: '扩散性百万甜面包',
    password: '123456',
    level: UserPermission.root
  }).then(() => debug('create user success'))
    .catch(() => debug('create user fail'))
}
