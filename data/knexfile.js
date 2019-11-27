// Update with your config settings.

module.exports = {
  client: 'sqlite3',
  connection: {
    filename: './zendesk.db'
  },
  migrations: {
    directory: './migrations'
  },
  seeds: {
    directory: './seeds'
  }
};
