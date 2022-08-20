import { AccessToken } from '@/domain/entities'

describe('AccessToken', () => {
  it('should create with a value', () => {
    const sut = new AccessToken('any_value')

    expect(sut).toEqual({ value: 'any_value' })
  })

  it('should expires in 30 * 60 * 1000 ms', () => {
    expect(AccessToken.expirationInMs).toBe(30 * 60 * 1000)
  })
})
