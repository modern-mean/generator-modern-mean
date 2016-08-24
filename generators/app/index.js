'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _yeomanGenerator = require('yeoman-generator');

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ModernMeanGenerator = function (_Base) {
  _inherits(ModernMeanGenerator, _Base);

  function ModernMeanGenerator() {
    var _Object$getPrototypeO;

    _classCallCheck(this, ModernMeanGenerator);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var _this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(ModernMeanGenerator)).call.apply(_Object$getPrototypeO, [this].concat(args)));

    _this.npmDependencies = ['@modern-mean/build-gulp', '@modern-mean/serve-gulp', '@modern-mean/server-express-module'];
    return _this;
  }

  _createClass(ModernMeanGenerator, [{
    key: 'prompting',
    value: function prompting() {

      var prompts = [{
        type: 'input',
        name: 'name',
        message: 'Your project name',
        default: this.appName // Default to current folder name
      }, {
        type: 'input',
        name: 'version',
        message: 'Version',
        default: '0.0.1'
      }, {
        type: 'input',
        name: 'description',
        message: 'Description',
        default: ''
      }, {
        type: 'input',
        name: 'keywords',
        message: 'Keywords',
        default: ''
      }, {
        type: 'input',
        name: 'gitbase',
        message: 'Git Base URL',
        default: 'https://github.com/modern-mean/server-config-module'
      }, {
        type: 'input',
        name: 'author',
        message: 'Author',
        default: this.author
      }, {
        type: 'input',
        name: 'license',
        message: 'License',
        default: 'ISC'
      }, {
        type: 'confirm',
        name: 'travis',
        message: 'Enable Travis CI(.travis.yml)?'
      }, {
        type: 'confirm',
        name: 'dependencies',
        message: 'Install Dependencies?'
      }];

      return this.prompt(prompts).then(function (answers) {
        this.answers = answers;
      }.bind(this));
    }
  }, {
    key: 'writing',
    value: function writing() {
      this.fs.copyTpl(this.templatePath('server/_package.json'), this.destinationPath('server/package.json'), { name: this.answers.name, version: this.answers.version, description: this.answers.description, keywords: this.answers.keywords, author: this.answers.author, gitbase: this.answers.gitbase, license: this.answers.license });
      this.fs.copy(this.templatePath('server/_babelrc'), this.destinationPath('server/.babelrc'));
      this.fs.copy(this.templatePath('server/_editorconfig'), this.destinationPath('server/.editorconfig'));
      this.fs.copy(this.templatePath('server/_eslintrc'), this.destinationPath('server/.eslintrc'));
      this.fs.copy(this.templatePath('server/_gitignore'), this.destinationPath('server/.gitignore'));
      this.fs.copy(this.templatePath('server/_npmignore'), this.destinationPath('server/.npmignore'));
      this.fs.copy(this.templatePath('server/gulpfile.babel.js'), this.destinationPath('server/gulpfile.babel.js'));
      this.fs.copy(this.templatePath('server/src'), this.destinationPath('server/src'));
      if (this.answers.travis === true) {
        this.fs.copy(this.templatePath('server/_travis.yml'), this.destinationPath('server/.travis.yml'));
      }
    }
  }, {
    key: 'install',
    value: function install() {
      if (this.answers.dependencies === true) {
        var npmdir = process.cwd() + '/server';
        process.chdir(npmdir);
        console.log(_chalk2.default.yellow('Installing Dependencies...'));
        this.npmInstall(this.npmDependencies, { save: true });
        this.npmInstall(this.npmDevDependencies, { saveDev: true }, function () {
          console.log(_chalk2.default.yellow('Dependencies Done.'));
        });
      }
    }
  }]);

  return ModernMeanGenerator;
}(_yeomanGenerator.Base);

module.exports = ModernMeanGenerator;