import { JwtTokenHandler } from '@/infra/crypto'

import jwt from 'jsonwebtoken'

jest.mock('jsonwebtoken')

describe('JwtTokenHandler', () => {
  let sut: JwtTokenHandler
  let fakeJwt: jest.Mocked<typeof jwt>
  let secret: string

  beforeAll(() => {
    secret = 'any_secret'
    fakeJwt = jwt as jest.Mocked<typeof jwt>
  })

  beforeEach(() => {
    sut = new JwtTokenHandler(secret)
  })

  describe('TokenGenerator', () => {
    let key: string
    let token: string
    let expirationInMs: number

    beforeAll(() => {
      key = 'any_key'
      expirationInMs = 1000
      token = 'any_token'
      fakeJwt.sign.mockImplementation(() => token)
    })

    it('should call sign with correct params', async () => {
      await sut.generate({ key, expirationInMs })

      expect(fakeJwt.sign).toHaveBeenCalledWith({ key }, secret, {
        expiresIn: 1
      })
      expect(fakeJwt.sign).toHaveBeenCalledTimes(1)
    })

    it('should return a token', async () => {
      const generate = await sut.generate({ key, expirationInMs })

      expect(generate).toBe(token)
    })

    it('should rethrow if sign throw', async () => {
      fakeJwt.sign.mockImplementationOnce(() => { throw new Error('token_error') })
      const promise = sut.generate({ key, expirationInMs })

      await expect(promise).rejects.toThrow(new Error('token_error'))
    })
  })

  describe('ValidateToken', () => {
    let token: string
    let key: string

    beforeAll(() => {
      key = 'any_key'
      token = 'any_token'
      fakeJwt.verify.mockImplementation(() => ({ key }))
    })

    it('should call verify with correct params', async () => {
      await sut.validate({ token })

      expect(fakeJwt.verify).toHaveBeenCalledWith(token, secret)
      expect(fakeJwt.verify).toHaveBeenCalledTimes(1)
    })

    it('should return the key used to sign', async () => {
      const generateKey = await sut.validate({ token })

      expect(generateKey).toBe(key)
    })

    it('should rethrow if verify return null', async () => {
      fakeJwt.verify.mockImplementationOnce(() => undefined)

      const promise = sut.validate({ token })

      await expect(promise).rejects.toThrow()
    })
  })
})
