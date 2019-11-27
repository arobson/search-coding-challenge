const user = require('../model/user');

function setupRoutes (fastify) {
  fastify.route({
    method: 'OPTIONS',
    url: '/user',
    handler: function (req, res) {
      try {
        res.send({
          type: 'user',
          properties: user.propertyList(),
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
        });
      } catch (e) {
        req.log.error(`cannot fetch options for user: ${e}`);
        res
          .status(500)
          .send({
            error: 'could not fetch options for user'
          });
      }
    }
  });

  fastify.route({
    method: 'GET',
    url: '/user',
    handler: async function (req, res) {
      try {
        const criteria = {
          field: req.query.field,
          operator: req.query.op,
          value: req.query.val
        };
        const users = await user.findUsersBy(fastify.knex, criteria);
        res.send({
          type: 'users',
          results: users
        });
      } catch (e) {
        req.log.error(`cannot fetch options for user: ${e}`);
        res
          .status(500)
          .send({
            error: 'could not fetch options for user'
          });
      }
    }
  });
}

module.exports = setupRoutes;
