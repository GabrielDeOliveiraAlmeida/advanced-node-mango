
import { FacebookAuthenticationService } from '@/data/services'
import { makeFacebookApi } from '@/main/factories/apis'
import { makeJwtTokenGenerator } from '@/main/factories/cripto'
import { makePgUserAccountRepository } from '@/main/factories/repos'

export const makeFacebookAuthenticationService = (): FacebookAuthenticationService => {
  const fbApi = makeFacebookApi()
  const pgUserAccountRepo = makePgUserAccountRepository()
  const jwtTokenGenerator = makeJwtTokenGenerator()

  return new FacebookAuthenticationService(fbApi, pgUserAccountRepo, jwtTokenGenerator)
}
