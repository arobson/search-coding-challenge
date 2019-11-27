process.env.NO_PICO = true;
require('dotenv').config();
const chai = require('chai');
chai.should();
global.expect = chai.expect;
chai.use(require('chai-as-promised'));
global.axios = require('axios').create({
  baseURL: 'http://localhost:3300'
});

global.sinon = require('sinon');
chai.use(require('sinon-chai'));

global.startServer = function startServer () {
  return require('../src/server/server')();
};

function isObject (value) {
  const type = typeof value;
  return value != null && (type === 'object' || type === 'function');
}

function deepCompare (a, b, k) {
  var diffs = [];
  if (b === undefined) {
    diffs.push('expected ' + k + ' to equal ' + a + ' but was undefined ');
  } else if (isObject(a) || Array.isArray(a)) {
    // _.each(a, function (v, c) {
    for (const c in a) {
      var key = k ? [k, c].join('.') : c;
      diffs = diffs.concat(deepCompare(a[c], b[c], key));
    }
  } else {
    var equal = a == b; // eslint-disable-line eqeqeq
    if (!equal) {
      diffs.push('expected ' + k + ' to equal ' + a + ' but got ' + b);
    }
  }
  return diffs;
}

chai.Assertion.addMethod('partiallyEql', function (partial) {
  var obj = this._obj;
  if (!obj.then) {
    obj = Promise.resolve(obj);
  }
  var self = this;
  return obj.then(function (actual) {
    var diffs = deepCompare(partial, actual);
    return self.assert(
      diffs.length === 0,
      diffs.join('\n\t')
    );
  });
});
