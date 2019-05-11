import { Daruk } from 'daruk'
import { debug } from '../'
import { User } from '../models/user'
import { UserPermission } from '../utils/shared'

export const plugin = {
  name: 'InitDB',
  priority: 0,
  register: async (daruk: Daruk) => {
    // @ts-ignore
    const { root } = daruk.config
    const { username, password } = root
    debug('Root Username:', username, 'password:', password)
    await User.findOne({ username }, {}, async (err, res) => {
      if (err) {
        throw err
      } else if (!res) {
        debug(username, 'not exist')
        await User.create({
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
