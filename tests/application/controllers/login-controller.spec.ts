import { ILoginController, LoginController } from '@/application/controllers'
import { Validation } from '@/application/protocols'
import { Authentication } from '@/domain/features'
import {
  unauthorized,
  serverError,
  badRequest,
  ok,
} from '@/application/helpers'

import { mock, MockProxy } from 'jest-mock-extended'

describe('LoginController', () => {
  let sut: LoginController
  let loginAuth: MockProxy<Authentication>
  let validation: MockProxy<Validation>
  let request: ILoginController.Request

  beforeAll(() => {
    request = {
      email: 'any_email',
      password: 'any_password',
    }
    loginAuth = mock()
    loginAuth.perform.mockResolvedValue({
      accessToken: 'any_token',
      name: 'any_name',
      id: 'any_id',
    })
    validation = mock()
  })

  beforeEach(() => {
    sut = new LoginController(validation, loginAuth)
  })

  it('should call LoginController with correct values', async () => {
    await sut.handle(request)

    expect(loginAuth.perform).toHaveBeenCalledWith(request)
    expect(loginAuth.perform).toHaveBeenCalledTimes(1)
  })

  it('Should return 401 if invalid credentials are provided', async () => {
    loginAuth.perform.mockResolvedValueOnce(null)
    const httpResponse = await sut.handle(request)

    expect(httpResponse).toEqual(unauthorized())
  })

  it('Should return 500 if Authentication throws', async () => {
    loginAuth.perform.mockRejectedValueOnce(new Error('auth_error'))
    const httpResponse = await sut.handle(request)
    expect(httpResponse).toEqual(serverError(new Error('auth_error')))
  })

  it('Should return 400 if Validation returns an error', async () => {
    validation.validate.mockReturnValueOnce(new Error('missingParams'))
    const httpResponse = await sut.handle(request)
    expect(httpResponse).toEqual(badRequest(new Error('missingParams')))
  })

  it('Should return 200 if valid credentials are provided', async () => {
    const httpResponse = await sut.handle(request)
    expect(httpResponse).toEqual(
      ok({
        accessToken: 'any_token',
        name: 'any_name',
        id: 'any_id',
      })
    )
  })
})
