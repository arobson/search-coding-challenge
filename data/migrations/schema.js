exports.up = function (knex) {
  return knex.schema
    .createTable('user', function (table) {
      table.integer('_id').primary('_id');
      table.string('url', 255).notNullable();
      table.string('external_id', 255).notNullable();
      table.string('name', 255).notNullable();
      table.string('alias', 255).defaultTo(null);
      table.dateTime('created_at').defaultTo(knex.fn.now());
      table.boolean('active').defaultTo(true);
      table.boolean('verified').defaultTo(false);
      table.boolean('shared').defaultTo(false);
      table.string('locale').defaultTo(null);
      table.string('timezone').defaultTo(null);
      table.dateTime('last_login_at').defaultTo(knex.fn.now());
      table.string('email', 255).defaultTo(null);
      table.string('phone', 16).notNullable();
      table.string('signature', 255).notNullable();
      table.string('organization_id', 112).defaultTo(null);
      table.string('tags', 255).notNullable();
      table.boolean('suspended').defaultTo(false);
      table.string('role', 255).notNullable();
    })
    .createTable('ticket', function (table) {
      table.string('_id').primary('id');
      table.string('url', 255).notNullable();
      table.string('external_id', 255).notNullable();
      table.dateTime('created_at').notNullable();
      table.string('type', 255).notNullable();
      table.string('subject', 255).notNullable();
      table.text('description', 4096).notNullable();
      table.string('priority', 255).notNullable();
      table.string('status', 255).notNullable();
      table.integer('submitter_id').notNullable();
      table.integer('assignee_id').notNullable();
      table.integer('organization_id').notNullable();
      table.string('tags', 255).notNullable();
      table.bool('has_incidents').notNullable();
      table.dateTime('due_at').defaultTo(knex.fn.now());
      table.string('via', 255).notNullable();
    })
    .createTable('organization', function (table) {
      table.integer('_id').primary('_id');
      table.string('url', 255).notNullable();
      table.string('external_id', 255).notNullable();
      table.dateTime('created_at').notNullable();
      table.string('name', 255).notNullable();
      table.string('domain_names', 512).notNullable();
      table.string('details', 255).defaultTo('');
      table.bool('shared_tickets').notNullable();
      table.string('tags', 255).notNullable();
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTable('organization')
    .dropTable('user')
    .dropTable('ticket');
};

exports.config = { transaction: false };
