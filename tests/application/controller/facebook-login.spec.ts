class FacebookLoginController {
  async handle (httpRequest: any): Promise<HttpResponse> {
    return {
      statusCode: 400,
      data: new Error('The Field token is required')
    }
  }
}

type HttpResponse = {
  statusCode: number
  data: any
}

describe('FacebookLoginController', () => {
  let sut: FacebookLoginController

  it('should return 400 if token is empty', async () => {
    sut = new FacebookLoginController()
    const httpResponse = await sut.handle({ token: '' })

    expect(httpResponse).toEqual({
      statusCode: 400,
      data: new Error('The Field token is required')
    })
  })

  it('should return 400 if token is null', async () => {
    sut = new FacebookLoginController()
    const httpResponse = await sut.handle({ token: null })

    expect(httpResponse).toEqual({
      statusCode: 400,
      data: new Error('The Field token is required')
    })
  })

  it('should return 400 if token is undefined', async () => {
    sut = new FacebookLoginController()
    const httpResponse = await sut.handle({ token: undefined })

    expect(httpResponse).toEqual({
      statusCode: 400,
      data: new Error('The Field token is required')
    })
  })
})
