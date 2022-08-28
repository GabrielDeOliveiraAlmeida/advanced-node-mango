import { HttpGetClient } from '@/infra/gateways'

import axios from 'axios'

type Params = HttpGetClient.Input

export class AxiosHttpClient implements HttpGetClient {
  async get ({ url, params }: Params): Promise<any> {
    const reuslt = await axios.get(url, { params })
    return reuslt.data
  }
}
