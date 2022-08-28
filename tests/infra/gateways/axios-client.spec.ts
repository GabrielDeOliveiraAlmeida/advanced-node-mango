import { AxiosHttpClient } from '@/infra/gateways'

import axios from 'axios'

jest.mock('axios')

describe('AxiosHttpGetClient', () => {
  describe('get', () => {
    let params: Object
    let url: string
    let fakeAxios: jest.Mocked<typeof axios>
    let sut: AxiosHttpClient

    beforeAll(() => {
      url = 'any_url'
      params = { any: 'any' }
      fakeAxios = axios as jest.Mocked<typeof axios>
      fakeAxios.get.mockResolvedValue({
        status: 200,
        data: 'any_data'
      })
    })

    beforeEach(() => {
      sut = new AxiosHttpClient()
    })

    it('should call get with correct params', async () => {
      await sut.get({ url, params })

      expect(fakeAxios.get).toHaveBeenCalledWith(url, { params })
      expect(fakeAxios.get).toHaveBeenCalledTimes(1)
    })

    it('should return data on success', async () => {
      const result = await sut.get({ url, params })

      expect(result).toEqual('any_data')
    })

    it('should rethrow if axios throw', async () => {
      fakeAxios.get.mockRejectedValueOnce(new Error('http_error'))
      const promise = sut.get({ url, params })

      await expect(promise).rejects.toThrow(new Error('http_error'))
    })
  })
})
