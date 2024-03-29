import { FacebookApi, AxiosHttpClient } from '@/infra/gateways'
import { env } from '@/main/config/env'

describe('Facebook Api Integration Test', () => {
  let sut: FacebookApi
  let axiosClient: AxiosHttpClient

  beforeEach(() => {
    axiosClient = new AxiosHttpClient()
    sut = new FacebookApi(
      axiosClient,
      env.facebookApi.clientId,
      env.facebookApi.clientSecretId
    )
  })
  it('should return a Facebook User if token is valid', async () => {
    const fbUser = await sut.loadUser({ token: 'EAAWJPRuFX6cBACrZBQ83t9QkVNxrFBzjElcjhxz1KFzUs75QZCgU4VdzDQjSLjYPQlXBFnGXZAhP1LgWro1PZAZC0qT2kSucwbooeZBCjxXiSPMC0PFzjCmcz9F0jhyjoZAZAZCc6AK6L1uoJ1M0TA5nZBq0H3QIBAH9WjsO4qABgbl9DJsyZCZBXBosYstNZCXmv6mTlcZCi9YijJ0ogCn6V9EPFZC' })

    expect(fbUser).toEqual({
      facebookId: '111579661664493',
      email: 'gabriel_gpcqufn_teste@tfbnw.net',
      name: 'Gabriel Teste'
    })
  })

  it('should return a Facebook User if token is invalid', async () => {
    const fbUser = await sut.loadUser({ token: 'invalid' })

    expect(fbUser).toBeUndefined()
  })
})
