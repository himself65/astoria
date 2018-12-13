import { handleAPI } from "../utils"

const login = {
  name: 'login',
  method: {
    post: handleAPI(async () => {
      // todo
    })
  }
}

const logout = {
  name: 'logout',
  method: {
    post: handleAPI(async () => {
      // todo
    })
  }
}

export {
  login,
  logout
}
