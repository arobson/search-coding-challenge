const dbConfig = require('./dbConfig');
const fastify = require('fastify');

function start () {
  const app = fastify({
    logger: !process.env.NO_PICO
  });

  app.register(require('fastify-knexjs'), dbConfig, err => console.error(err));
  app.route({
    method: 'OPTIONS',
    url: '/',
    handler: function (req, res) {
      res.send({
        links: [
          { rel: 'ticket', href: '/ticket', method: 'options' },
          { rel: 'organization', href: '/organization', method: 'options' },
          { rel: 'user', href: '/user', method: 'options' }
        ]
      });
    }
  });
  require('./resource/organization')(app);
  require('./resource/ticket')(app);
  require('./resource/user')(app);

  app.onClose(() => {
    app.knex.destroy();
  });

  return (async function () {
    await app.listen(3300);
    return app;
  })();
}

module.exports = start;
