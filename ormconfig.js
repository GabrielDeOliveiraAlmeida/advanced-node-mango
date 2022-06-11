module.exports = {
  type: 'mongodb',
  useNewUrlParser: true,
  url: process.env.DB_URL,
  ssl: true,
  authSource: 'admin',
  entities: [
    `${process.env.TS_NODE_DEV === undefined ? 'dist' : 'src'}/infra/db/mongodb/entities/index.{js,ts}`
  ]
}
