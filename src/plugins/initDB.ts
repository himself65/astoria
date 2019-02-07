import { debug } from '../'
import { User } from '../models/user'
import { UserPermission } from '../utils/shared'

export const plugin = {
  name: 'InitDB',
  priority: 0,
  register: (_, config) => {
    const { root } = config._global
    const { username, password } = root
    debug('Root Username:', username, 'password:', password)
    User.findOne({ username }, {}, (err, res) => {
      if (err) {
        throw err
      } else if (!res) {
        debug(username, 'not exist')
        User.create({
          username, password,
          nickname: username,
          level: UserPermission.root
        }, (err) => {
          if (err) {
            throw err
          } else {
            console.log('创建root用户成功')
          }
        })
      } else {
        debug(username, 'has existed')
      }
    })
  }
}
