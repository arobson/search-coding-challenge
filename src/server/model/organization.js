const FIELD_LOOKUP = {
  id: '_id',
  'external id': 'external_id',
  'date created': 'created_at',
  name: 'name',
  'domain name': 'domain_names',
  details: 'details',
  'can share tickets': 'shared_tickets',
  tags: 'tags'
};

function propertyList () {
  return {
    id: 'integer',
    'external id': 'string',
    'date created': 'datetime',
    name: 'string',
    'domain name': 'string',
    details: 'string',
    'can have share tickets': 'boolean',
    tags: 'string'
  };
}

function findOrganizationBy (db, criteria) {
  console.log(criteria);
  if (criteria.field && criteria.operator && criteria.value) {
    return db
      .select('*')
      .from('organization')
      .where(builder => builder.where(
        FIELD_LOOKUP[criteria.field],
        criteria.operator,
        criteria.value
      ));
  } else {
    throw new Error('cannot query for organization without valid criteria including a field, operator, and value');
  }
}

module.exports = {
  propertyList,
  findOrganizationBy
};
