import { env } from '@/main/config/env'

import { ConnectionOptions } from 'typeorm'

export const config: ConnectionOptions = {
  type: 'postgres',
  host: env.postgresConfig.host,
  port: env.postgresConfig.port,
  username: env.postgresConfig.username,
  database: env.postgresConfig.database,
  password: env.postgresConfig.password,
  entities: ['dist/infra/postgress/entities/index.js']
}
