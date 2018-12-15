import { handleAPI } from '../utils'

const login = {
  name: 'login',
  methods: {
    post: handleAPI(async (query) => {
      // todo
      const { username, password } = query
    })
  }
}

const logout = {
  name: 'logout',
  methods: {
    post: handleAPI(async () => {
      // todo
    })
  }
}

export {
  login,
  logout
}
