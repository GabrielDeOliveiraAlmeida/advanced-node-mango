import { DeletePictureController, Controller } from '@/application/controllers'

describe('DescribePictureController', () => {
  let sut: DeletePictureController
  let changeProfilePicture: jest.Mock

  beforeAll(() => {
    changeProfilePicture = jest.fn()
  })

  beforeEach(() => {
    sut = new DeletePictureController(changeProfilePicture)
  })

  it('should exnteds Controller', async () => {
    expect(sut).toBeInstanceOf(Controller)
  })

  it('should call ChangeProfilePicture with correct input', async () => {
    await sut.perform({ userId: 'any_user_id' })

    expect(changeProfilePicture).toHaveBeenCalledWith({
      id: 'any_user_id'
    })
    expect(changeProfilePicture).toHaveBeenCalledTimes(1)
  })

  it('should return 204', async () => {
    const httpResponse = await sut.handle({ userId: 'any_user_id' })

    expect(httpResponse).toEqual({
      statusCode: 204,
      data: null
    })
  })
})
