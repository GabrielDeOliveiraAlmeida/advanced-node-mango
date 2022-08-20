
import { FacebookLoginController } from '@/application/controllers'
import { makeFacebookAuthenticationService } from '@/main/factories/services/facebook-authentication'

export const makeFacebookController = (): FacebookLoginController => {
  const fbServices = makeFacebookAuthenticationService()
  return new FacebookLoginController(fbServices)
}
