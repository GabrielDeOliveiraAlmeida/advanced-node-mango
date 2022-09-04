import { RequiredFieldError } from '@/application/errors'
import { Required, RequiredString } from '@/application/validations'

describe('Required', () => {
  let sut: Required

  it('should return Error if value is null', () => {
    sut = new Required(null as any, 'any_field')

    const error = sut.validate()

    expect(error).toEqual(new RequiredFieldError('any_field'))
  })

  it('should return Error if value is undefined ', () => {
    sut = new Required(undefined as any, 'any_field')

    const error = sut.validate()

    expect(error).toEqual(new RequiredFieldError('any_field'))
  })

  it('should return Error if value is not empty ', () => {
    sut = new Required('any_value', 'any_field')

    const error = sut.validate()

    expect(error).toBeUndefined()
  })
})

describe('RequiredString', () => {
  let sut: RequiredString

  it('should extends Required', () => {
    sut = new RequiredString('')

    expect(sut).toBeInstanceOf(Required)
  })

  it('should return Error if value is empty', () => {
    sut = new RequiredString('', 'any_field')

    const error = sut.validate()

    expect(error).toEqual(new RequiredFieldError('any_field'))
  })

  it('should return Error if value is not empty ', () => {
    sut = new RequiredString('any_value', 'any_field')

    const error = sut.validate()

    expect(error).toBeUndefined()
  })
})
