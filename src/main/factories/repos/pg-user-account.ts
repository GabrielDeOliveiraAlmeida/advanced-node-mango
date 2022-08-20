
import { PgUserAccountRepository } from '@/infra/postgress/repos'

export const makePgUserAccountRepository = (): PgUserAccountRepository => {
  return new PgUserAccountRepository()
}
