import axios from 'axios'
import * as config from '../../config.json'
import { JsonController, Get, Param } from 'routing-controllers'

const {
  plugins: {
    checkin: {
      getUserUrl,
      getGroupsUrl
    }
  }
} = config

export async function query (userID?: number | string) {
  const url = userID === undefined ? getGroupsUrl : `${getUserUrl}/${userID}`
  return axios.get(url).then(res => {
    return res.data
  })
}

@JsonController()
export class CheckinController {

  @Get('/checkin/:id')
  async getByID (@Param('id') id: number) {
    return query(id)
  }

  @Get('/checkin')
  getAll () {
    return query()
  }
}
