import { UniqueId } from '@/infra/gateways'

describe('UniqueId', () => {
  it('should call uuuid.v4', () => {
    const sut = new UniqueId(new Date(2022, 8, 28, 17, 4, 55, 10))
    const uuid = sut.uuid({ key: 'any_key' })

    expect(uuid).toBe('any_key_2022082817045510')
  })

  it('should call uuuid.v4', () => {
    const sut = new UniqueId(new Date(2022, 1, 28, 17, 4, 55, 10))

    const uuid = sut.uuid({ key: 'any_key' })

    expect(uuid).toBe('any_key_2022012817045510')
  })
})
