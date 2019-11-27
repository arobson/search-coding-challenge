const ticket = require('../model/ticket');

function setupRoutes (fastify) {
  fastify.route({
    method: 'OPTIONS',
    url: '/ticket',
    handler: function (req, res) {
      try {
        res.send({
          type: 'ticket',
          properties: ticket.propertyList(),
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
        });
      } catch (e) {
        req.log.error(`cannot fetch options for ticket: ${e}`);
        res
          .status(500)
          .send({
            error: 'could not fetch options for ticket'
          });
      }
    }
  });

  fastify.route({
    method: 'GET',
    url: '/ticket',
    handler: async function (req, res) {
      try {
        const criteria = {
          field: req.query.field,
          operator: req.query.op,
          value: req.query.val
        };
        const tickets = await ticket.findTicketsBy(fastify.knex, criteria);
        res.send({
          type: 'tickets',
          results: tickets
        });
      } catch (e) {
        req.log.error(`cannot fetch tickets: ${e}`);
        res
          .status(500)
          .send({
            error: 'could not fetch tickets'
          });
      }
    }
  });
}

module.exports = setupRoutes;
