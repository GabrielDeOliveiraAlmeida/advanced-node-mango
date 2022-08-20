import { AccessToken } from '@/domain/entities'

describe('AccessToken', () => {
  it('should expires in 30 * 60 * 1000 ms', () => {
    expect(AccessToken.expirationInMs).toBe(30 * 60 * 1000)
  })
})
