import { RequiredFieldError } from '@/application/errors'

class RequiredStringValidator {
  constructor (private readonly value: string, private readonly fieldName: string) {

  }

  validate (): Error | undefined {
    return new RequiredFieldError('any_field')
  }
}

describe('RequiredStringValidator', () => {
  let sut: RequiredStringValidator
  it('should return Error if value is empty', () => {
    sut = new RequiredStringValidator('', 'any_field')

    const error = sut.validate()

    expect(error).toEqual(new RequiredFieldError('any_field'))
  })

  it('should return Error if value is null', () => {
    sut = new RequiredStringValidator(null as any, 'any_field')

    const error = sut.validate()

    expect(error).toEqual(new RequiredFieldError('any_field'))
  })

  it('should return Error if value is undefined ', () => {
    sut = new RequiredStringValidator(undefined as any, 'any_field')

    const error = sut.validate()

    expect(error).toEqual(new RequiredFieldError('any_field'))
  })
})
