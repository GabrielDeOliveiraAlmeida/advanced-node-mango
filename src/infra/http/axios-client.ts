import { HttpGetClient } from '@/infra/http'

import axios from 'axios'

export class AxiosHttpClient {
  async get (args: HttpGetClient.Params): Promise<any> {
    const reuslt = await axios.get(args.url, { params: args.params })
    return reuslt.data
  }
}
