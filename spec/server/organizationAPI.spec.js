require('../setup');

describe('Organization HTTP API', function () {
  let server;
  before(async function () {
    server = await global.startServer();
  });

  it('should return options', function () {
    return axios.options('/organization')
      .should.eventually.partiallyEql({
        status: 200,
        data: {
          type: 'organization',
          properties: {
            id: 'integer',
            'external id': 'string',
            'date created': 'datetime',
            name: 'string',
            'domain name': 'string',
            details: 'string',
            'can have share tickets': 'boolean',
            tags: 'string'
          },
          links: [
            {
              rel: 'search',
              href: '/organization',
              method: 'get',
              parameters: {
                field: 'string',
                op: 'string',
                val: 'any'
              }
            }
          ]
        }
      });
  });

  it('should return error if criteria is missing', function () {
    return axios.get('/organization')
      .should.eventually.be.rejectedWith({
        status: 500,
        data: {
          error: 'things got bad'
        }
      });
  });

  it('should return correct results for queries', function () {
    return axios.get('/organization?field=name&op==&val=Xylar')
      .should.eventually.partiallyEql({
        data: {
          type: 'organizations',
          results: [
            { name: 'Xylar', _id: '104' }
          ]
        }
      });
  });

  after(function () {
    return server.close();
  });
});
