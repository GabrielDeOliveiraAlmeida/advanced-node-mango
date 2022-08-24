import { LoadUserAccount, SaveFacebookAccount } from '@/domain/contracts/repos'
import { PgUser } from '@/infra/postgress/entities'

import { getRepository } from 'typeorm'

type LoadParams = LoadUserAccount.Input
type LoadResult = LoadUserAccount.Output
type SaveParams = SaveFacebookAccount.Input
type SaveResult = SaveFacebookAccount.Output

export class PgUserAccountRepository implements LoadUserAccount, SaveFacebookAccount {
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
