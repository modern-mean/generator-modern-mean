import { Base } from 'yeoman-generator';
import * as packageConfig from '../shared/package';
import yosay from 'yosay';
import merge from 'lodash.merge';

class ModernMeanGenerator extends Base {

  constructor(...args) {
    super(...args);
    
    this.npmDependencies = packageConfig.app.dependencies;
    this.npmDevDependencies = packageConfig.app.devDependencies;

  }

  initializing() {
    console.log(yosay('Welcome to the Modern-Mean application generator!'));

    this.composeWith('github-create:package', {
      options: {
        main: 'index.js'
      }
    }, {
      local: require.resolve('generator-github-create/generators/package')
    });
  }

  prompting() {

    let prompts = [
      {
        type: 'confirm',
        name: 'api',
        message: 'API Server?',
        default: true
      },
      {
        type: 'confirm',
        name: 'travis',
        message: 'Travis CI?',
        default: true
      }
    ];

    return this.prompt(prompts)
      .then(answers => {
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

    this.fs.copyTpl(
      this.templatePath('server'),
      this.destinationPath('server'),
      {
        modules: { api: config.api }
      }
    );

    this.fs.copy(
      this.templatePath('../../module/templates/_babelrc'),
      this.destinationPath('.babelrc')
    );

    this.fs.copy(
      this.templatePath('index.js'),
      this.destinationPath('index.js')
    );

  }

  install() {
    this.npmInstall(this.npmDependencies, { 'save': true });
    this.npmInstall(this.npmDevDependencies, { 'saveDev': true });
  }


}

module.exports = ModernMeanGenerator;
