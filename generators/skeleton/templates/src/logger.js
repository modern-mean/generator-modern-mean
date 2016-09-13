export default () => {
  //https://github.com/winstonjs/winston
  return {
    winston: {
      level:  process.env.<%= classname.toUpperCase() %>_LOG_LEVEL,
      file: process.env.<%= classname.toUpperCase() %>_LOG_FILE,
      console: process.env.<%= classname.toUpperCase() %>_LOG_CONSOLE
    }
  };
};
