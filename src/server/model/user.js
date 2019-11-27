const FIELD_LOOKUP = {
  id: '_id',
  'external id': 'external_id',
  name: 'name',
  alias: 'alias',
  'date created': 'created_at',
  'is active': 'active',
  'is verified': 'verified',
  'can share tickets': 'shared',
  locale: 'locale',
  timezone: 'timezone',
  'last login at': 'last_login_at',
  email: 'email',
  phone: 'phone',
  signature: 'signature',
  'organization id': 'organization_id',
  tags: 'tags',
  'is suspended': 'suspended',
  role: 'role'
};

function propertyList () {
  return {
    id: 'integer',
    'external id': 'integer',
    name: 'string',
    alias: 'string',
    'date created': 'datetime',
    'is active': 'boolean',
    'is verified': 'boolean',
    'can share tickets': 'boolean',
    locale: 'string',
    timezone: 'string',
    'last login at': 'datetime',
    email: 'string',
    phone: 'string',
    signature: 'string',
    'organization id': 'integer',
    tags: 'string',
    'is suspended': 'boolean',
    role: 'string'
  };
}

function findUsersBy (db, criteria) {
  if (criteria.field && criteria.operator && criteria.value) {
    return db
      .select('*')
      .from('user')
      .where(builder => builder.where(
        FIELD_LOOKUP[criteria.field],
        criteria.operator,
        criteria.value
      ));
  } else {
    throw new Error('cannot query for user without valid criteria including a field, operator, and value');
  }
}

module.exports = {
  propertyList,
  findUsersBy
};
