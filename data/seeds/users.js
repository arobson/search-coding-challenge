
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('user').del()
    .then(function () {
      // Inserts seed entries
      return knex('user')
        .insert(require('./flat_users1.json'))
        .insert(require('./flat_users2.json'));
    });
};
