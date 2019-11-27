require('../setup');

describe('User HTTP API', function () {
  let server;
  before(async function () {
    server = await global.startServer();
  });

  it('should return options', function () {
    return axios.options('/user')
      .should.eventually.partiallyEql({
        status: 200,
        data: {
          type: 'user',
          properties: {
            id: 'integer',
            'external id': 'integer',
            name: 'string',
            alias: 'string',
            'date created': 'datetime',
            'is active': 'boolean',
            'is verified': 'boolean',
            'can share tickets': 'boolean',
            locale: 'string',
            timezone: 'string',
            'last login at': 'datetime',
            email: 'string',
            phone: 'string',
            signature: 'string',
            'organization id': 'integer',
            tags: 'string',
            'is suspended': 'boolean',
            role: 'string'
          },
          links: [
            {
              rel: 'search',
              href: '/user',
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
    return axios.get('/user')
      .should.eventually.be.rejectedWith({
        status: 500,
        data: {
          error: 'things got bad'
        }
      });
  });

  it('should return correct results for queries', function () {
    return axios.get('/user?field=name&op=like&val=Elma%20Castro%')
      .should.eventually.partiallyEql({
        data: {
          type: 'users',
          results: [
            { name: 'Elma Castro', _id: '38' }
          ]
        }
      });
  });

  after(function () {
    return server.close();
  });
});
