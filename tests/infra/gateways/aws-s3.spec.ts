import { config } from 'aws-sdk'

jest.mock('aws-sdk')

class AwsS3FileStorage {
  constructor (private readonly accessKey: string, private readonly secret: string) {
    config.update({
      credentials: {
        accessKeyId: accessKey,
        secretAccessKey: secret
      }
    })
  }
}

describe('AWSS3FileStorage', () => {
  let sut: AwsS3FileStorage
  let accessKey: string
  let secret: string

  beforeEach(() => {
    sut = new AwsS3FileStorage(accessKey, secret)
  })

  beforeAll(() => {
    accessKey = 'any_key'
    secret = 'any_secret'
  })

  it('should config aws credentials on creation', () => {
    expect(sut).toBeDefined()
    expect(config.update).toHaveBeenCalledWith({
      credentials: {
        accessKeyId: accessKey,
        secretAccessKey: secret
      }
    })
    expect(config.update).toHaveBeenCalledTimes(1)
  })
})
