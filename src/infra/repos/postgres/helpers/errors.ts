
export class ConnectionNotFoundError extends Error {
  constructor () {
    super('No connection found')
    this.name = 'ConnectionNotFoundError'
  }
}
