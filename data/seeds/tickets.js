
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('ticket').del()
    .then(function () {
      // Inserts seed entries
      console.log('wtf');
      return knex('ticket')
        .insert(require('./flat_tickets1.json'))
        .insert(require('./flat_tickets2.json'))
        .insert(require('./flat_tickets3.json'))
        .insert(require('./flat_tickets4.json'));
    });
};
