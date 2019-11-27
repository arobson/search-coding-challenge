function getConnection () {
  switch (process.env.KNEX_DB_ADAPTER) {
    case 'sqlite':
      return {
        filename: process.env.SQLITE_DB
      };
    default:
      return {
        filename: process.env.SQLITE_DB
      };
  }
}

module.exports = {
  client: process.env.KNEX_DB_ADAPTER || 'sqlite',
  connection: getConnection(),
  useNullAsDefault: true
};
