
import { LoadFacebookUserApi } from '@/data/contracts/apis'
import { FacebookAuthenticationService } from '@/data/services'
import { AuthenticationError } from '@/domain/errors'

import { mock } from 'jest-mock-extended'

describe('FaceboookAuthentication', () => {
  it('should call LoadFacebookAPI with correct params', async () => {
    const loadFacebookUserApi = mock<LoadFacebookUserApi>()

    const sut = new FacebookAuthenticationService(loadFacebookUserApi)

    await sut.perform({ token: 'any_token' })

    expect(loadFacebookUserApi.loadUser).toHaveBeenCalledWith({ token: 'any_token' })
    expect(loadFacebookUserApi.loadUser).toHaveBeenCalledTimes(1)
  })

  it('should return AuthenticationError  when LoadFAcebookAPI return undefined', async () => {
    const loadFacebookUserApi = mock<LoadFacebookUserApi>()

    loadFacebookUserApi.loadUser.mockResolvedValueOnce(undefined)

    const sut = new FacebookAuthenticationService(loadFacebookUserApi)

    const result = await sut.perform({ token: 'any_token' })

    expect(result).toEqual(new AuthenticationError())
  })
})
