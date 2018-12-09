import axios from 'axios'
import { handleError } from "../utils"
import config from '../../config.example'

const {
  plugins: {
    checkin: {
      getUserUrl,
      getGroupsUrl
    }
  }
} = config

async function query (userID) {
  const url = userID === undefined ? getGroupsUrl : `${getUserUrl}/${userID}`
  return axios.get(url).then(res => {
    return res.data
  })
}

export default {
  name: 'checkin',
  method: {
    get: handleError(async ctx => {
      const {
        id = undefined
      } = ctx.request.query
      try {
        ctx.response.body = await query(id)
      } catch (err) {
        console.error(err)
        throw ctx
      }
    })
  }
}
