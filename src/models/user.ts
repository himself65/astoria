// import crypto from 'crypto'
import mongoose from '../utils/database'
import { UserPermission } from '../utils/shared'
import { debug } from '../'

const Schema = mongoose.Schema

/**
 * @param username 用户名，不可更改，不可重复
 * @param nickname 昵称，可随意修改
 * @param password 密码，加密后保存
 */
export const UserSchema = new Schema({
  username: { type: String, required: true, unique: true },
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
  }
})

export const User = mongoose.model('User', UserSchema)

export async function create () {
  await User.create({
    username: 'himself65',
    nickname: '扩散性百万甜面包',
    password: '123456', // fixme: use sale hash
    level: UserPermission.root
  }).then(debug('created user success.'))
}
