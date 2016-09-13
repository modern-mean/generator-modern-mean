'use strict';

var _yeomanGenerator = require('yeoman-generator');

var _yosay = require('yosay');

var _yosay2 = _interopRequireDefault(_yosay);

var _lodash = require('lodash.merge');

var _lodash2 = _interopRequireDefault(_lodash);

var _lodash3 = require('lodash.defaults');

var _lodash4 = _interopRequireDefault(_lodash3);

var _lodash5 = require('lodash.camelcase');

var _lodash6 = _interopRequireDefault(_lodash5);

var _lodash7 = require('lodash.upperfirst');

var _lodash8 = _interopRequireDefault(_lodash7);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _modules = require('../shared/modules');

var extendModules = _interopRequireWildcard(_modules);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ModernMeanSkeletonModuleGenerator extends _yeomanGenerator.Base {

  constructor(...args) {
    super(...args);

    this.option('classname', {
      type: String,
      alias: 'c',
      desc: 'Class Name'
    });

    this.option('extendModule', {
      type: String,
      alias: 'm',
      desc: 'Modern Mean module name to extend.  Ex:  BaseModule'
    });

    this.option('tests', {
      type: String,
      alias: 't',
      desc: 'Create unit tests'
    });

    this.option('nosay', {
      type: String,
      alias: 'n',
      desc: 'No Yo Say'
    });
  }

  initializing() {
    /* istanbul ignore if: Since yosay can't be stubbed properly */
    if (!this.options.nosay) {
      console.log((0, _yosay2.default)('Welcome to the Modern-Mean application module generator!'));
    }

    this.options = (0, _lodash4.default)(this.options, {
      classname: (0, _lodash8.default)((0, _lodash6.default)(_path2.default.basename(process.cwd()))),
      extendModule: 'BaseModule',
      tests: true
    });
  }

  prompting() {

    let prompts = [{
      name: 'classname',
      message: 'New Module Class Name',
      default: this.options.classname
    }, {
      choices: extendModules.choices,
      type: 'rawlist',
      name: 'extendModule',
      message: 'Module to extend',
      default: this.options.extendModule
    }, {
      type: 'confirm',
      name: 'tests',
      message: 'Create unit tests?',
      default: this.options.tests
    }];

    return this.prompt(prompts).then(answers => {
      answers.extendModule = extendModules.info[extendModules.choices.indexOf(answers.extendModule)];
      this.config.set('skeleton', answers);
    });
  }

  configuring() {
    return this.config.save();
  }

  writing() {
    let config = this.config.get('skeleton');

    this.fs.copyTpl(this.templatePath('src'), this.destinationPath('src'), {
      classname: config.classname,
      extendmodule: config.extendModule
    });

    if (this.config.get('skeleton').tests) {
      this.fs.copyTpl(this.templatePath('test'), this.destinationPath('test'), {
        classname: config.classname,
        extendmodule: config.extendModule
      });
    }
  }

}

module.exports = ModernMeanSkeletonModuleGenerator;