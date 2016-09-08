import { Base } from 'yeoman-generator';
import chalk from 'chalk';
import merge from 'lodash.merge';
import path from 'path';

let MMModules = [
  {
    name: 'Mongoose Module',
    value: '@modern-mean/server-mongoose-module'
  }
];

class ModernMeanGenerator extends Base {

  constructor(...args) {
    super(...args);

    this.npmDependencies = [
      '@modern-mean/server-base-module'
    ];

    this.npmDevDependencies = [
      'babel-core',
      'babel-plugin-istanbul',
      'babel-preset-es2015-node6',
      'chai',
      'chai-as-promised',
      'cross-env',
      'eslint',
      'nyc',
      'sinon',
      'sinon-as-promised',
      'sinon-chai'
    ];

    this.option('name', {
      type: String,
      alias: 'n',
      desc: 'Package Name',
      defaults: path.basename(process.cwd())
    });

    this.option('class', {
      type: String,
      alias: 'c',
      desc: 'Class Name',
      defaults: 'MMNewModule'
    });

    this.option('description', {
      type: String,
      alias: 'd',
      desc: 'Package Description'
    });

    this.option('keywords', {
      type: String,
      alias: 'k',
      desc: 'Package Keywords'
    });

    this.option('version', {
      type: String,
      alias: 'v',
      desc: 'Package Version',
      defaults: '0.0.0'
    });

    this.option('author', {
      type: String,
      alias: 'a',
      desc: 'Package Version',
      defaults: this.user.git.name()
    });

    this.option('email', {
      type: String,
      alias: 'e',
      desc: 'Author Email',
      defaults: this.user.git.email()
    });

    this.option('license', {
      type: String,
      alias: 'a',
      desc: 'Package License'
    });
  }

  initializing() {

  }

  prompting() {
    let prompts = [
      {
        name: 'name',
        message: 'Package Name',
        default: this.options.name
      },
      {
        name: 'version',
        message: 'Package Version',
        default: this.options.version
      },
      {
        name: 'description',
        message: 'Package Description',
        default: this.options.description
      },
      {
        name: 'keywords',
        message: 'Package Keywords(comma separated)',
        default: this.options.description
      },
      {
        name: 'author',
        message: 'Package Author',
        default: this.options.author
      },
      {
        name: 'email',
        message: 'Author Email',
        default: this.options.email
      },
      {
        type: 'confirm',
        name: 'travis',
        message: 'Use Travis CI?',
        default: true
      },
      {
        name: 'class',
        message: 'New Module Class Name',
        default: this.options.class
      }
    ];
    return this.prompt(prompts).then(answers => {
      answers.keywords = answers.keywords.split(',').map(item => item.trim());
      this.config.set('module', answers);
      return answers;
    })
    .then(answers => {
      this.composeWith('license', {
        options: {
          name: answers.author,
          email: answers.email,
          website: 'test'
        }
      }, {
        local: require.resolve('generator-license/app')
      });
    })
    .then(() => {
      return [{
        type: 'confirm',
        name: 'createrepository',
        message: 'Create remote github repository?',
        default: true
      }];
    })
    .then(prompts => this.prompt(prompts))
    .then(answers => {
      this.config.set('module', merge(this.config.get('module'), answers));
    });
  }

  configuring() {
    this.config.save();
  }

  default() {
    let config = this.config.get('module');
    if (config.createrepository) {
      this.composeWith('github-create:authenticate', {}, {
        local: require.resolve('generator-github-create/generators/authenticate')
      });
      this.composeWith('github-create:orgs', {}, {
        local: require.resolve('generator-github-create/generators/orgs')
      });
      this.composeWith('github-create:create', {
        options: {
          name: config.name,
          description: config.description
        }
      }, {
        local: require.resolve('generator-github-create/generators/create')
      });

    }
  }

  writing() {
    let config = this.config.get('module');

    if (this.config.get('module').createrepository) {

      this.composeWith('github-create:readme', {}, {
        local: require.resolve('generator-github-create/generators/readme')
      });

    }

    this.fs.copyTpl(
      this.templatePath('_package.json'),
      this.destinationPath('package.json'),
      { name: config.name, version: config.version, description: config.description, keywords: config.keywords, author: config.author, repository: config.repository }
    );

    this.fs.copy(
      this.templatePath('_babelrc'),
      this.destinationPath('.babelrc')
    );
    this.fs.copy(
      this.templatePath('_editorconfig'),
      this.destinationPath('.editorconfig')
    );
    this.fs.copy(
      this.templatePath('_eslintrc'),
      this.destinationPath('.eslintrc')
    );
    this.fs.copy(
      this.templatePath('_gitignore'),
      this.destinationPath('.gitignore')
    );
    this.fs.copy(
      this.templatePath('_npmignore'),
      this.destinationPath('.npmignore')
    );
    this.fs.copy(
      this.templatePath('gulpfile.babel.js'),
      this.destinationPath('gulpfile.babel.js')
    );

    if (config.travis) {
      this.fs.copy(
        this.templatePath('_travis.yml'),
        this.destinationPath('.travis.yml')
      );
    }

    this.fs.copyTpl(
      this.templatePath('src'),
      this.destinationPath('src'),
      {
        classname: this.config.get('module').class
      }
    );

    this.fs.copyTpl(
      this.templatePath('tests'),
      this.destinationPath('tests'),
      {
        classname: this.config.get('module').class
      }
    );

  }

  install() {
    this.npmInstall(this.npmDependencies, { 'save': true });
    this.npmInstall(this.npmDevDependencies, { 'saveDev': true });
  }

  end() {

  }
}

module.exports = ModernMeanGenerator;
