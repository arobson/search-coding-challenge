const organization = require('../model/organization');

function setupRoutes (fastify) {
  fastify.route({
    method: 'OPTIONS',
    url: '/organization',
    handler: function (req, res) {
      try {
        res.send({
          type: 'organization',
          properties: organization.propertyList(),
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
        });
      } catch (e) {
        req.log.error(`cannot fetch options for organization: ${e}`);
        res
          .status(500)
          .send({
            error: 'could not fetch options for organization'
          });
      }
    }
  });

  fastify.route({
    method: 'GET',
    url: '/organization',
    handler: async function (req, res) {
      try {
        const criteria = {
          field: req.query.field,
          operator: req.query.op,
          value: req.query.val
        };
        const organizations = await organization.findOrganizationBy(fastify.knex, criteria);
        res.send({
          type: 'organizations',
          results: organizations
        });
      } catch (e) {
        req.log.error(`cannot fetch options for organization: ${e}`);
        res
          .status(500)
          .send({
            error: 'could not fetch options for organization'
          });
      }
    }
  });
}

module.exports = setupRoutes;
