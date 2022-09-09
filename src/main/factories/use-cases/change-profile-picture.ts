
import { setupChangeProfilePicture, ChangeProfilePicture } from '@/domain/use-cases'
import { makeAwsS3FileStorage, makeUUIDHandler } from '@/main/factories/gateways'
import { makePgUserProfileRepository } from '@/main/factories/repos/postgres'

export const makeChangeProfilePicture = (): ChangeProfilePicture => {
  return setupChangeProfilePicture(makeAwsS3FileStorage(), makeUUIDHandler(), makePgUserProfileRepository())
}
