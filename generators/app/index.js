'use strict';

var _yeomanGenerator = require('yeoman-generator');

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ModernMeanGenerator extends _yeomanGenerator.Base {

  constructor(...args) {
    super(...args);

    this.answers = {};

    this.npmDependencies = ['@modern-mean/build-gulp', '@modern-mean/serve-gulp', '@modern-mean/server-express-module'];
  }

}

module.exports = ModernMeanGenerator;