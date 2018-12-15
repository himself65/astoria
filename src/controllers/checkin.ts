import axios from 'axios'
import { Context } from 'koa'
import { handleError } from '../utils'
import * as config from '../../config.json'

const {
  plugins: {
    checkin: {
      getUserUrl,
      getGroupsUrl
    }
  }
} = config

async function query (userID: string) {
  const url = userID === undefined ? getGroupsUrl : `${getUserUrl}/${userID}`
  return axios.get(url).then(res => {
    return res.data
  })
}

export default {
  name: 'checkin',
  methods: {
    get: handleError(async (ctx: Context) => {
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
