import { HttpResponse, ok, unauthorized } from '@/application/helpers'
import { ValidationBuilder, Validator } from '@/application/validations'
import { AccessToken } from '@/domain/entities'
import { FacebookAuthentication } from '@/domain/use-cases'

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
    const accessToken = await this.facebookAuthentication({ token })
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
