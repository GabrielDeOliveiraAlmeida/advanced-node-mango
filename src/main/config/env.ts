export const env = {
  facebookApi: {
    clientId: process.env.FB_CLIENT_ID ?? '',
    clientSecretId: process.env.FB_CLIENT_SECRET ?? ''
  },
  appPort: process.env.PORT ?? 8080,
  jwtSecret: process.env.JWT_SECRET ?? 'secret',
  postgresConfig: {
    host: process.env.POSTGRES_HOST ?? '',
    port: Number(process.env.POSTGRES_PORT) ?? 5432,
    username: process.env.POSTGRES_USERNAME ?? '',
    database: process.env.POSTGRES_DATABASE ?? '',
    password: process.env.POSTGRES_PASSWORD ?? ''
  }

}
