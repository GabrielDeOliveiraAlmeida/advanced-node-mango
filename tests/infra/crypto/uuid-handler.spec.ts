import { UUIDGenerator } from '@/domain/contracts/gateways'

import { mocked } from 'ts-jest/utils'
import { v4 } from 'uuid'

jest.mock('uuid')

class UUIDHandler {
  uuid ({ key }: UUIDGenerator.Input): UUIDGenerator.Output {
    return `${key}_${v4()}`
  }
}
describe('UUID Handler', () => {
  let sut: UUIDHandler

  beforeAll(() => {
    mocked(v4).mockReturnValue('any_uuid')
  })

  beforeEach(() => {
    sut = new UUIDHandler()
  })

  it('should call uuuid.v4', () => {
    sut.uuid({ key: 'any_key' })

    expect(v4).toHaveBeenCalledTimes(1)
  })

  it('should return correct uuid', () => {
    const uuid = sut.uuid({ key: 'any_key' })

    expect(uuid).toBe('any_key_any_uuid')
  })
})
