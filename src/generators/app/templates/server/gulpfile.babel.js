import gulp from 'gulp';
import * as serve from '@modern-mean/serve-gulp';
import * as builder from '@modern-mean/build-gulp';

//Environment variables for all environments
function all() {
  process.env.MM_SERVER_ENTRY = './dist/server.js';
}

//Environment variables for debug environment
function debug(done) {
  all();

  process.env.NODE_ENV = 'development';
  process.env.MM_LOG_LEVEL = 'debug';

  return done();
}

//Environment variables for development environment
function development(done) {
  all();

  process.env.NODE_ENV = 'development';
  process.env.MM_LOG_LEVEL = 'info';

  return done();
}

function production(done) {
  all();

  process.env.NODE_ENV = 'production';
  process.env.MM_LOG_CONSOLE = 'false';

  return done();
}


//Gulp Default
let defaultTask = gulp.series(development, builder.build.clean, builder.build.src, serve.nodemon.start);
defaultTask.displayName = 'default';
gulp.task(defaultTask);

//Gulp Debug
let debugTask = gulp.series(debug, builder.build.clean, builder.build.src, serve.nodemon.start);
debugTask.displayName = 'debug';
gulp.task(debugTask);
