import { LoadUserAccountRepository, SaveFacebookAccountRepository } from '@/domain/contracts/repos'
import { PgUser } from '@/infra/postgress/entities'

import { getRepository } from 'typeorm'

type LoadParams = LoadUserAccountRepository.Input
type LoadResult = LoadUserAccountRepository.Output
type SaveParams = SaveFacebookAccountRepository.Input
type SaveResult = SaveFacebookAccountRepository.Output

export class PgUserAccountRepository implements LoadUserAccountRepository, SaveFacebookAccountRepository {
  async load ({ email }: LoadParams): Promise<LoadResult> {
    const pgUserRepo = getRepository(PgUser)
    const pgUser = await pgUserRepo.findOne({ email })
    if (pgUser !== undefined) {
      return {
        id: pgUser.id.toString(),
        name: pgUser.name ?? undefined
      }
    }
  }

  async saveWithFacebook ({ id, email, name, facebookId }: SaveParams): Promise<SaveResult> {
    const pgUserRepo = getRepository(PgUser)
    let restultId: string
    if (id === undefined) {
      const pgUser = await pgUserRepo.save({ email, name, facebookId })
      restultId = pgUser.id.toString()
    } else {
      restultId = id
      await pgUserRepo.update({ id: parseInt(id) }, { name, facebookId })
    }
    return { id: restultId }
  }
}
