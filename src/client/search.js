const axios = require('axios').create({
  baseURL: 'http://localhost:3300'
});

const meta = require('./metadata')(axios);
const getQuery = require('./prompt');
const Table = require('table-layout');

function build () {
  return {};
}

function findLink (resource, rel) {
  for (var i = 0; i < resource.links.length; i++) {
    const link = resource.links[i];
    if (link.rel === rel) {
      return link;
    }
  }
}

async function handle () {
  const metadata = await meta.getResources();
  const query = await getQuery(metadata);
  const resource = metadata[query.resource];
  const link = findLink(resource, 'search');
  const response = await axios[link.method](`${link.href}?field=${query.field}&op=${query.operator}&val=${query.value}`);
  const records = response.data.results;
  console.clear();
  console.log(`${records.length} records were found matching your criteria: (${query.field} ${query.operator} ${query.value})`);
  records.forEach(record => {
    console.log(`****************************** ${resource.type} : ${record._id} ******************************`);
    const keys = Object.keys(record);
    const table = new Table(keys.map(key => {
      return {col1: key, col2: record[key]}
    }));
    console.log(table.toString())
  });
}

module.exports = function () {
  return {
    command: 'search',
    desc: 'search the ticket database by resource and field',
    builder: build(),
    handler: handle
  };
};
