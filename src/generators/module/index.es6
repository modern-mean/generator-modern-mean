import { Base } from 'yeoman-generator';
import chalk from 'chalk';
import merge from 'lodash.merge';
import defaults from 'lodash.defaults';
import kebab from 'lodash.kebabcase';
import camel from 'lodash.camelcase';
import upperFirst from 'lodash.upperfirst';
import path from 'path';
import * as packageConfig from '../shared/package';
import yosay from 'yosay';


class ModernMeanModuleGenerator extends Base {

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

    this.options = defaults(this.options, this.config.get('module'), {
      createrepository: true,
      nosay: true
    });

    /* istanbul ignore if: Since yosay can't be stubbed properly */
    if (!this.options.nosay) {
      console.log(yosay('Welcome to the Modern-Mean module generator!'));
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

    return this.prompt(prompts)
      .then(answers => {
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

    this.fs.copy(
      this.templatePath('../../module/templates/_babelrc'),
      this.destinationPath('.babelrc')
    );
    this.fs.copy(
      this.templatePath('../../module/templates/_editorconfig'),
      this.destinationPath('.editorconfig')
    );
    this.fs.copy(
      this.templatePath('../../module/templates/_eslintrc'),
      this.destinationPath('.eslintrc')
    );
    this.fs.copy(
      this.templatePath('../../module/templates/_gitignore'),
      this.destinationPath('.gitignore')
    );
    this.fs.copy(
      this.templatePath('../../module/templates/_npmignore'),
      this.destinationPath('.npmignore')
    );
    this.fs.copy(
      this.templatePath('../../module/templates/_travis.yml'),
      this.destinationPath('.travis.yml')
    );

  }

  install() {
    this.npmInstall(this.npmDependencies, { 'save': true });
    this.npmInstall(this.npmDevDependencies, { 'saveDev': true });
  }

  end() {

  }
}

module.exports = ModernMeanModuleGenerator;
