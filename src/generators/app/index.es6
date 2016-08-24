import { Base } from 'yeoman-generator';
import chalk from 'chalk';

class ModernMeanGenerator extends Base {

  constructor(...args) {
    super(...args);

    this.npmDependencies = [
      '@modern-mean/build-gulp',
      '@modern-mean/serve-gulp',
      '@modern-mean/server-express-module'
    ];
  }

  prompting() {

    const prompts = [
      {
        type    : 'input',
        name    : 'name',
        message : 'Your project name',
        default : this.appName // Default to current folder name
      },
      {
        type    : 'input',
        name    : 'version',
        message : 'Version',
        default : '0.0.1'
      },
      {
        type    : 'input',
        name    : 'description',
        message : 'Description',
        default : ''
      },
      {
        type    : 'input',
        name    : 'keywords',
        message : 'Keywords',
        default : ''
      },
      {
        type    : 'input',
        name    : 'gitbase',
        message : 'Git Base URL',
        default : 'https://github.com/modern-mean/server-config-module'
      },
      {
        type    : 'input',
        name    : 'author',
        message : 'Author',
        default : this.author
      },
      {
        type    : 'input',
        name    : 'license',
        message : 'License',
        default : 'ISC'
      },
      {
        type    : 'confirm',
        name    : 'travis',
        message : 'Enable Travis CI(.travis.yml)?'
      },
      {
        type    : 'confirm',
        name    : 'dependencies',
        message : 'Install Dependencies?'
      }
    ];

    return this.prompt(prompts).then(function (answers) {
      this.answers = answers;
    }.bind(this));
  }

  writing() {
    this.fs.copyTpl(
      this.templatePath('server/_package.json'),
      this.destinationPath('server/package.json'),
      { name: this.answers.name, version: this.answers.version, description: this.answers.description, keywords: this.answers.keywords, author: this.answers.author, gitbase: this.answers.gitbase, license: this.answers.license }
    );
    this.fs.copy(
      this.templatePath('server/_babelrc'),
      this.destinationPath('server/.babelrc')
    );
    this.fs.copy(
      this.templatePath('server/_editorconfig'),
      this.destinationPath('server/.editorconfig')
    );
    this.fs.copy(
      this.templatePath('server/_eslintrc'),
      this.destinationPath('server/.eslintrc')
    );
    this.fs.copy(
      this.templatePath('server/_gitignore'),
      this.destinationPath('server/.gitignore')
    );
    this.fs.copy(
      this.templatePath('server/_npmignore'),
      this.destinationPath('server/.npmignore')
    );
    this.fs.copy(
      this.templatePath('server/gulpfile.babel.js'),
      this.destinationPath('server/gulpfile.babel.js')
    );
    this.fs.copy(
      this.templatePath('server/src'),
      this.destinationPath('server/src')
    );
    if(this.answers.travis === true) {
      this.fs.copy(
        this.templatePath('server/_travis.yml'),
        this.destinationPath('server/.travis.yml')
      );
    }
  }

  install() {
    if(this.answers.dependencies === true) {
      var npmdir = process.cwd() + '/server';
      process.chdir(npmdir);
      console.log(chalk.yellow('Installing Dependencies...'));
      this.npmInstall(this.npmDependencies, { save: true });
      this.npmInstall(this.npmDevDependencies, { saveDev: true }, () => {
        console.log(chalk.yellow('Dependencies Done.'));
      });
    }
  }
}

module.exports = ModernMeanGenerator;
