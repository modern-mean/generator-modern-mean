'use strict';

var _yeomanGenerator = require('yeoman-generator');

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _lodash = require('lodash.merge');

var _lodash2 = _interopRequireDefault(_lodash);

var _lodash3 = require('lodash.defaults');

var _lodash4 = _interopRequireDefault(_lodash3);

var _lodash5 = require('lodash.kebabcase');

var _lodash6 = _interopRequireDefault(_lodash5);

var _lodash7 = require('lodash.camelcase');

var _lodash8 = _interopRequireDefault(_lodash7);

var _lodash9 = require('lodash.upperfirst');

var _lodash10 = _interopRequireDefault(_lodash9);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _package = require('../shared/package');

var packageConfig = _interopRequireWildcard(_package);

var _yosay = require('yosay');

var _yosay2 = _interopRequireDefault(_yosay);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ModernMeanModuleGenerator extends _yeomanGenerator.Base {

  constructor(...args) {
    super(...args);

    this.option('nosay', {
      type: String,
      alias: 'n',
      desc: 'No Yo Say'
    });

    this.option('createrepository', {
      type: String,
      alias: 'c',
      desc: 'Create remote github repository'
    });

    this.npmDependencies = [];
    this.npmDevDependencies = packageConfig.devDependencies;
  }

  initializing() {

    this.options = (0, _lodash4.default)(this.options, this.config.get('module'), {
      createrepository: true,
      nosay: true
    });

    /* istanbul ignore if: Since yosay can't be stubbed properly */
    if (!this.options.nosay) {
      console.log((0, _yosay2.default)('Welcome to the Modern-Mean module generator!'));
    }

    this.composeWith('@modern-mean/modern-mean:skeleton', {
      options: {
        nosay: true
      }
    }, {
      //local: require.resolve('@modern-mean/generator-modern-mean/generators/skeleton')
    });
  }

  prompting() {
    let prompts = [{
      type: 'confirm',
      name: 'createrepository',
      message: 'Create remote github repository?',
      default: this.options.createrepository
    }];

    return this.prompt(prompts).then(answers => {
      this.config.set('module', answers);
      /* istanbul ignore next: Not needed */
      if (answers.createrepository) {
        this.composeWith('github-create:authenticate', {}, {
          //local: require.resolve('generator-github-create/generators/authenticate')
        });
        this.composeWith('github-create:create', {}, {
          //local: require.resolve('generator-github-create/generators/create')
        });
      }
      this.composeWith('github-create:package', {}, {
        //local: require.resolve('generator-github-create/generators/package')
      });
    });
  }

  configuring() {
    return this.config.save();
  }

  default() {
    /* istanbul ignore next: dont know how to mock this */
    if (this.config.get('skeleton')) {
      this.npmDependencies.push(this.config.get('skeleton').extendModule.module);
    }
  }

  writing() {
    let config = this.config.get('module');
    /* istanbul ignore next: not needed */
    if (config.createrepository) {
      this.composeWith('github-create:readme', {}, {
        //local: require.resolve('generator-github-create/generators/readme')
      });
    }

    let pkg = this.fs.readJSON(this.destinationPath('package.json'), {});
    /* istanbul ignore next: Not sure how to mock this */
    if (!pkg) {
      pkg = this.fs.readJSON(this.fs.writeJSON(this.destinationPath('package.json'), {}));
    }
    pkg.scripts = packageConfig.appScripts;
    pkg.nyc = packageConfig.nycConfig;
    this.fs.writeJSON(this.destinationPath('package.json'), pkg);

    this.fs.copy(this.templatePath('../../module/templates/_babelrc'), this.destinationPath('.babelrc'));
    this.fs.copy(this.templatePath('../../module/templates/_editorconfig'), this.destinationPath('.editorconfig'));
    this.fs.copy(this.templatePath('../../module/templates/_eslintrc'), this.destinationPath('.eslintrc'));
    this.fs.copy(this.templatePath('../../module/templates/_gitignore'), this.destinationPath('.gitignore'));
    this.fs.copy(this.templatePath('../../module/templates/_npmignore'), this.destinationPath('.npmignore'));
    this.fs.copy(this.templatePath('../../module/templates/_travis.yml'), this.destinationPath('.travis.yml'));
  }

  install() {
    this.npmInstall(this.npmDependencies, { 'save': true });
    this.npmInstall(this.npmDevDependencies, { 'saveDev': true });
  }

  end() {}
}

module.exports = ModernMeanModuleGenerator;