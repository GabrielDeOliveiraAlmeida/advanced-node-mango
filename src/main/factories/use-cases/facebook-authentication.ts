
import { FacebookAuthenticationUseCase } from '@/domain/use-cases'
import { makeFacebookApi } from '@/main/factories/apis'
import { makeJwtTokenGenerator } from '@/main/factories/cripto'
import { makePgUserAccountRepository } from '@/main/factories/repos'

export const makeFacebookAuthentication = (): FacebookAuthenticationUseCase => {
  const fbApi = makeFacebookApi()
  const pgUserAccountRepo = makePgUserAccountRepository()
  const jwtTokenGenerator = makeJwtTokenGenerator()

  return new FacebookAuthenticationUseCase(fbApi, pgUserAccountRepo, jwtTokenGenerator)
}
