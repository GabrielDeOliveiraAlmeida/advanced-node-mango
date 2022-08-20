export const env = {
  facebookApi: {
    clientId: process.env.FB_CLIENT_ID ?? '',
    clientSecretId: process.env.FB_CLIENT_SECRET ?? ''
  },
  appPort: process.env.PORT ?? 8080
}
