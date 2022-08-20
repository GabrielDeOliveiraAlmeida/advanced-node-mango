
import { FacebookLoginController } from '@/application/controllers'
import { makeFacebookAuthentication } from '@/main/factories/use-cases/facebook-authentication'

export const makeFacebookLoginController = (): FacebookLoginController => {
  const fbServices = makeFacebookAuthentication()
  return new FacebookLoginController(fbServices)
}
