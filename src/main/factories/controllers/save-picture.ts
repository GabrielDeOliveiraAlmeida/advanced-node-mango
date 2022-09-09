
import { Controller, SavePictureController } from '@/application/controllers'
import { makePgTransactionController } from '@/main/factories/decorators'
import { makeChangeProfilePicture } from '@/main/factories/use-cases'

export const makeSavePictureController = (): Controller => {
  const controller = new SavePictureController(makeChangeProfilePicture())
  return makePgTransactionController(controller)
}
