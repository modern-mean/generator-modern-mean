'use strict';

var _yeomanGenerator = require('yeoman-generator');

var _package = require('../shared/package');

var packageConfig = _interopRequireWildcard(_package);

var _yosay = require('yosay');

var _yosay2 = _interopRequireDefault(_yosay);

var _lodash = require('lodash.merge');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

class ModernMeanGenerator extends _yeomanGenerator.Base {

  constructor(...args) {
    super(...args);

    this.npmDependencies = packageConfig.app.dependencies;
    this.npmDevDependencies = packageConfig.app.devDependencies;
  }

  initializing() {
    console.log((0, _yosay2.default)('Welcome to the Modern-Mean application generator!'));

    this.composeWith('github-create:package', {
      options: {
        main: 'index.js'
      }
    }, {
      local: require.resolve('generator-github-create/generators/package')
    });
  }

  prompting() {

    let prompts = [{
      type: 'confirm',
      name: 'api',
      message: 'API Server?',
      default: true
    }, {
      type: 'confirm',
      name: 'travis',
      message: 'Travis CI?',
      default: true
    }];

    return this.prompt(prompts).then(answers => {
      if (answers.api) {
        this.npmDependencies.push('@modern-mean/server-api-module');
      }
      this.config.set('app', answers);
    });
  }

  configuring() {
    return this.config.save();
  }

  writing() {
    let config = this.config.get('app');

    let pkg = this.fs.readJSON(this.destinationPath('package.json'), {});
    /* istanbul ignore next: Not sure how to mock this */
    if (!pkg) {
      pkg = this.fs.readJSON(this.fs.writeJSON(this.destinationPath('package.json'), {}));
    }
    pkg.scripts = packageConfig.app.scripts;
    this.fs.writeJSON(this.destinationPath('package.json'), pkg);

    this.fs.copyTpl(this.templatePath('server'), this.destinationPath('server'), {
      modules: { api: config.api }
    });

    this.fs.copy(this.templatePath('../../module/templates/_babelrc'), this.destinationPath('.babelrc'));

    this.fs.copy(this.templatePath('index.js'), this.destinationPath('index.js'));
  }

  install() {
    this.npmInstall(this.npmDependencies, { 'save': true });
    this.npmInstall(this.npmDevDependencies, { 'saveDev': true });
  }

}

module.exports = ModernMeanGenerator;