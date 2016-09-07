import { Base } from 'yeoman-generator';
import chalk from 'chalk';

class ModernMeanGenerator extends Base {

  constructor(...args) {
    super(...args);

    this.answers = {};


    this.npmDependencies = [
      '@modern-mean/build-gulp',
      '@modern-mean/serve-gulp',
      '@modern-mean/server-express-module'
    ];

  }


}

module.exports = ModernMeanGenerator;
