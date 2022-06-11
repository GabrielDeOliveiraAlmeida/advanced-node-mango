import { LoadFacebookUserApi } from '@/data/contracts/apis'
import { CreateFacebookAccountRepository, LoadUserAccountRepository } from '@/data/contracts/repos'
import { AuthenticationError } from '@/domain/errors'
import { FacebookAuthentication } from '@/domain/features'

export class FacebookAuthenticationService {
  constructor (
    private readonly facebookApi: LoadFacebookUserApi,
    private readonly loadAccountRepo: LoadUserAccountRepository & CreateFacebookAccountRepository
  ) { }

  async perform (
    params: FacebookAuthentication.Params
  ): Promise<AuthenticationError> {
    const fbData = await this.facebookApi.loadUser(params)
    if (fbData !== undefined) {
      await this.loadAccountRepo.load({ email: fbData.email })
      await this.loadAccountRepo.createFromFacebook(fbData)
    }
    return new AuthenticationError()
  }
}
