import { Base } from 'yeoman-generator';
import yosay from 'yosay';
import merge from 'lodash.merge';
import defaults from 'lodash.defaults';
import camel from 'lodash.camelcase';
import upperFirst from 'lodash.upperfirst';
import path from 'path';
import * as extendModules from '../shared/modules';

class ModernMeanSkeletonModuleGenerator extends Base {

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
      console.log(yosay('Welcome to the Modern-Mean application module generator!'));
    }

    this.options = defaults(this.options, {
      classname: upperFirst(camel(path.basename(process.cwd()))),
      extendModule: 'BaseModule',
      tests: true
    });
  }

  prompting() {

    let prompts = [
      {
        name: 'classname',
        message: 'New Module Class Name',
        default: this.options.classname
      },
      {
        choices: extendModules.choices,
        type: 'rawlist',
        name: 'extendModule',
        message: 'Module to extend',
        default: this.options.extendModule
      },
      {
        type: 'confirm',
        name: 'tests',
        message: 'Create unit tests?',
        default: this.options.tests
      }
    ];

    return this.prompt(prompts)
      .then(answers => {
        answers.extendModule = extendModules.info[extendModules.choices.indexOf(answers.extendModule)];
        this.config.set('skeleton', answers);
      });

  }

  configuring() {
    return this.config.save();
  }

  writing() {
    let config = this.config.get('skeleton');

    this.fs.copyTpl(
      this.templatePath('src'),
      this.destinationPath('src'),
      {
        classname: config.classname,
        extendmodule: config.extendModule
      }
    );

    if(this.config.get('skeleton').tests) {
      this.fs.copyTpl(
        this.templatePath('test'),
        this.destinationPath('test'),
        {
          classname: config.classname,
          extendmodule: config.extendModule
        }
      );
    }
  }

}

module.exports = ModernMeanSkeletonModuleGenerator;
