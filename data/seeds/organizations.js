
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('organization').del()
    .then(function () {
      // Inserts seed entries
      return knex('organization')
        .insert(require('./flat_organizations.json'));
    });
};
