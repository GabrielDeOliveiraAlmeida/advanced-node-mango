import { UniqueId } from '@/infra/gateways'

import { set, reset } from 'mockdate'
describe('UniqueId', () => {
  let sut: UniqueId

  beforeAll(() => {
    set(new Date(2022, 8, 28, 17, 4, 55, 10))
    sut = new UniqueId()
  })

  afterAll(() => {
    reset()
  })
  it('should create unique id', () => {
    const uuid = sut.uuid({ key: 'any_key' })

    expect(uuid).toBe('any_key_2022082817045510')
  })
})
