import { LoadUserAccountRepository, SaveFacebookAccountRepository } from '@/data/contracts/repos'
import { PgUser } from '@/infra/postgress/entities'

import { getRepository } from 'typeorm'

type LoadParams = LoadUserAccountRepository.Params
type LoadResult = LoadUserAccountRepository.Result
type SaveParams = SaveFacebookAccountRepository.Params
type SaveResult = SaveFacebookAccountRepository.Result

export class PgUserAccountRepository implements LoadUserAccountRepository, SaveFacebookAccountRepository {
  private readonly pgUserRepo = getRepository(PgUser)

  async load ({ email }: LoadParams): Promise<LoadResult> {
    const pgUser = await this.pgUserRepo.findOne({ email })
    if (pgUser !== undefined) {
      return {
        id: pgUser.id.toString(),
        name: pgUser.name ?? undefined
      }
    }
  }

  async saveWithFacebook ({ id, email, name, facebookId }: SaveParams): Promise<SaveResult> {
    let restultId: string
    if (id === undefined) {
      const pgUser = await this.pgUserRepo.save({ email, name, facebookId })
      restultId = pgUser.id.toString()
    } else {
      restultId = id
      await this.pgUserRepo.update({ id: parseInt(id) }, { name, facebookId })
    }
    return { id: restultId }
  }
}
