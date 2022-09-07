import { LoadUserAccount, SaveFacebookAccount } from '@/domain/contracts/repos'
import { PgRepository } from '@/infra/repos/postgres'
import { PgUser } from '@/infra/repos/postgres/entities'

type LoadParams = LoadUserAccount.Input
type LoadResult = LoadUserAccount.Output
type SaveParams = SaveFacebookAccount.Input
type SaveResult = SaveFacebookAccount.Output

export class PgUserAccountRepository extends PgRepository implements LoadUserAccount, SaveFacebookAccount {
  async load ({ email }: LoadParams): Promise<LoadResult> {
    const pgUserRepo = this.getRepository(PgUser)
    const pgUser = await pgUserRepo.findOne({ email })
    if (pgUser !== undefined) {
      return {
        id: pgUser.id.toString(),
        name: pgUser.name ?? undefined
      }
    }
  }

  async saveWithFacebook ({ id, email, name, facebookId }: SaveParams): Promise<SaveResult> {
    const pgUserRepo = this.getRepository(PgUser)
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
