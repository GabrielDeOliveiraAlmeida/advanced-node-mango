
import { setupFacebookAuthentication, FacebookAuthentication } from '@/domain/use-cases'
import { makeFacebookApi, makeJwtTokenHandler } from '@/main/factories/gateways'
import { makePgUserAccountRepository } from '@/main/factories/repos/postgres'

export const makeFacebookAuthentication = (): FacebookAuthentication => {
  const fbApi = makeFacebookApi()
  const pgUserAccountRepo = makePgUserAccountRepository()
  const jwtTokenGenerator = makeJwtTokenHandler()

  return setupFacebookAuthentication(fbApi, pgUserAccountRepo, jwtTokenGenerator)
}
