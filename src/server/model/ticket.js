const FIELD_LOOKUP = {
  id: '_id',
  'external id': 'external_id',
  'date created': 'created_at',
  type: 'type',
  subject: 'subject',
  description: 'description',
  priority: 'priority',
  status: 'status',
  'submitter id': 'submitter_id',
  'assignee id': 'assignee_id',
  'organization id': 'organization_id',
  tags: 'tags',
  'has incidents': 'has_incidents',
  'due date': 'due_at',
  via: 'via'
};

function propertyList () {
  return {
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
  };
}

function findTicketsBy (db, criteria) {
  if (criteria.field && criteria.operator && criteria.value) {
    return db
      .select('*')
      .from('ticket')
      .where(builder => builder.where(
        FIELD_LOOKUP[criteria.field],
        criteria.operator,
        criteria.value
      ));
  } else {
    throw new Error('cannot query for ticket without valid criteria including a field, operator, and value');
  }
}

module.exports = {
  propertyList,
  findTicketsBy
};
