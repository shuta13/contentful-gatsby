'use strict';

require('ts-node').register({
  compilerOptions: {
    module: 'commonjs',
    target: 'ES2017',
  },
});

exports.createPages = require('./gatsby-node/index').createPages;
