export default {
  //https://github.com/winstonjs/winston
  winston: {
    level:  process.env.<%= classname.toUpperCase() %>_LOG_LEVEL || process.env.MM_LOG_LEVEL || 'info', //{ error: 0, warn: 1, info: 2, verbose: 3, debug: 4, silly: 5 }
    file: process.env.<%= classname.toUpperCase() %>_LOG_FILE || process.env.MM_LOG_FILE || 'false',
    console: process.env.<%= classname.toUpperCase() %>_LOG_CONSOLE || process.env.MM_LOG_CONSOLE || 'true'
  }
};
