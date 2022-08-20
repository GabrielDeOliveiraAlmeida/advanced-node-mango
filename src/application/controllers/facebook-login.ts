import { HttpResponse, ok, unauthorized } from '@/application/helpers'
import { ValidationBuilder, Validator } from '@/application/validations'
import { FacebookAuthentication } from '@/domain/features'
import { AccessToken } from '@/domain/models'

import { Controller } from './controller'

type HttpRequest = {
  token: string
}

type Model = Error | {
  accessToken: string
}

export class FacebookLoginController extends Controller {
  constructor (private readonly facebookAuthentication: FacebookAuthentication) {
    super()
  }

  async perform ({ token }: HttpRequest): Promise<HttpResponse<Model>> {
    const accessToken = await this.facebookAuthentication.perform({ token })
    if (accessToken instanceof AccessToken) {
      return ok({ accessToken: accessToken.value })
    }
    return unauthorized()
  }

  override buildValidators ({ token }: HttpRequest): Validator[] {
    return [...ValidationBuilder
      .of({ value: token, fieldName: 'token' })
      .required()
      .build()
    ]
  }
}
