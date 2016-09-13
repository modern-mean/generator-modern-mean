import { <%= extendmodule.name %> } from '<%= extendmodule.module %>';
import config from './config';
import logger from './logger';


export class <%= classname %> extends <%= extendmodule.name %> {

  constructor(...args) {
    //Push default configuration to front of array.  Passed in configuration from ...args should take precedence.
    args.unshift({ config: config(), logger: logger() });
    super(...args);

    this.config = this.getConfigModule().get();
    this.logger = this.getLoggerModule().get();

  }

  get() {
    return this;
  }

}
