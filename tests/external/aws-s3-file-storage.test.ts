import { AwsS3FileStorage } from '@/infra/gateways'
import { env } from '@/main/config/env'

import axios from 'axios'

describe('AWS S3 File Storage', () => {
  let sut: AwsS3FileStorage

  beforeEach(() => {
    sut = new AwsS3FileStorage(
      env.s3.accessKey,
      env.s3.secret,
      env.s3.bucket
    )
  })

  it('should upload an delete from s3', async () => {
    const onePixelImage = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQIW2NYqNPyHwAFFAJR4sxn2wAAAABJRU5ErkJggg=='
    const file = Buffer.from(onePixelImage, 'base64')
    const fileName = 'any_fileName'

    const pictureUrl = await sut.upload({ fileName: fileName, file })

    expect((await axios.get(pictureUrl)).status).toBe(200)

    await sut.delete({ fileName: fileName })

    await expect(axios.get(pictureUrl)).rejects.toThrow()
  })
})
