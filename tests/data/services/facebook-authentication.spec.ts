
import { LoadFacebookUserApi } from '@/data/contracts/apis'
import { FacebookAuthenticationService } from '@/data/services'
import { AuthenticationError } from '@/domain/errors'

import { mock, MockProxy } from 'jest-mock-extended'

describe('FaceboookAuthentication', () => {
  let loadFacebookUserApi: MockProxy<LoadFacebookUserApi>
  let sut: FacebookAuthenticationService
  const token = 'any_token'

  beforeEach(() => {
    loadFacebookUserApi = mock<LoadFacebookUserApi>()
    sut = new FacebookAuthenticationService(loadFacebookUserApi)
  })

  it('should call LoadFacebookAPI with correct params', async () => {
    await sut.perform({ token: 'any_token' })

    expect(loadFacebookUserApi.loadUser).toHaveBeenCalledWith({ token })
    expect(loadFacebookUserApi.loadUser).toHaveBeenCalledTimes(1)
  })

  it('should return AuthenticationError  when LoadFAcebookAPI return undefined', async () => {
    loadFacebookUserApi.loadUser.mockResolvedValueOnce(undefined)

    const result = await sut.perform({ token })

    expect(result).toEqual(new AuthenticationError())
  })
})
