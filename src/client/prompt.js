const inquirer = require('inquirer');

function getQuery (metadata) {
  return inquirer.prompt([
    {
      name: 'resource',
      message: 'which item would you like to search for?',
      type: 'list',
      choices: Object.keys(metadata)
    },
    {
      name: 'field',
      message: function (answers) {
        return `which field on ${answers.resource} are you searching against?`;
      },
      type: 'list',
      choices: function (answers) {
        return Object.keys(
          metadata[answers.resource].properties
        );
      }
    },
    {
      name: 'operator',
      message: function (answers) {
        return `what kind of comparison are you using to search ${answers.resource}'s ${answers.field}?`;
      },
      type: 'list',
      choices: ['=', 'like']
    },
    {
      name: 'value',
      message: function (answers) {
        return answers.operator === 'like'
          ? `please provide a value with '%' wildcards to match ${answers.resource}'s ${answers.field} field`
          : `please provide a value to search for in ${answers.resource}'s ${answers.field} field`;
      },
      type: 'input'
    }
  ]);
}

module.exports = getQuery;
