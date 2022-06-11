
import { LoadFacebookUserApi } from '@/data/contracts/apis'
import { LoadUserAccountRepository } from '@/data/contracts/repos'
import { FacebookAuthenticationService } from '@/data/services'
import { AuthenticationError } from '@/domain/errors'

import { mock, MockProxy } from 'jest-mock-extended'

describe('FaceboookAuthentication', () => {
  let loadUserRepo: MockProxy<LoadUserAccountRepository>
  let loadFacebookUserApi: MockProxy<LoadFacebookUserApi>
  let sut: FacebookAuthenticationService
  const token = 'any_token'

  beforeEach(() => {
    loadFacebookUserApi = mock()
    loadFacebookUserApi.loadUser.mockResolvedValue({
      name: 'any_fb_name',
      email: 'any_fb_email',
      facebookId: 'any_fb_id'
    })
    loadUserRepo = mock()
    sut = new FacebookAuthenticationService(loadFacebookUserApi, loadUserRepo)
  })

  it('should call LoadFacebookAPI with correct params', async () => {
    await sut.perform({ token })

    expect(loadFacebookUserApi.loadUser).toHaveBeenCalledWith({ token })
    expect(loadFacebookUserApi.loadUser).toHaveBeenCalledTimes(1)
  })

  it('should return AuthenticationError  when LoadFAcebookAPI return undefined', async () => {
    loadFacebookUserApi.loadUser.mockResolvedValueOnce(undefined)

    const result = await sut.perform({ token })

    expect(result).toEqual(new AuthenticationError())
  })

  it('should call LoadUserAccountRepo when LoadFacebookUserAPI returns data', async () => {
    await sut.perform({ token })

    expect(loadUserRepo.load).toHaveBeenCalledWith({ email: 'any_fb_email' })
    expect(loadUserRepo.load).toHaveBeenCalledTimes(1)
  })
})
