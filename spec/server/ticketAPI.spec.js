require('../setup');

describe('Ticket HTTP API', function () {
  let server;
  before(async function () {
    server = await global.startServer();
  });

  it('should return options', function () {
    return axios.options('/ticket')
      .should.eventually.partiallyEql({
        status: 200,
        data: {
          type: 'ticket',
          properties: {
            id: 'integer',
            'external id': 'string',
            'date created': 'datetime',
            type: 'string',
            subject: 'string',
            description: 'string',
            priority: 'string',
            status: 'string',
            'submitter id': 'integer',
            'assignee id': 'integer',
            'organization id': 'integer',
            tags: 'string',
            'has incidents': 'boolean',
            'due date': 'datetime',
            via: 'string'
          },
          links: [
            {
              rel: 'search',
              href: '/ticket',
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
    return axios.get('/ticket')
      .should.eventually.be.rejectedWith({
        status: 500,
        data: {
          error: 'things got bad'
        }
      });
  });

  it('should return correct results for queries', function () {
    return axios.get('/ticket?field=subject&op==&val=A%20Drama%20in%20Guinea')
      .should.eventually.partiallyEql({
        data: {
          type: 'tickets',
          results: [
            { subject: 'A Drama in Guinea', _id: '945ce2d3-3edc-4936-8d51-e59e74cf917a' }
          ]
        }
      });
  });

  after(function () {
    return server.close();
  });
});
