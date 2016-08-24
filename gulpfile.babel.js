'use strict';

import gulp from 'gulp';
import * as builder from '@modern-mean/build-gulp';
import del from 'del';
import rename from 'gulp-rename';


function clean() {
  return del([
    './generators'
  ]);
}
clean.displayName = 'clean';
gulp.task(clean);

function cleanDist() {
  return del([
    './dist',
  ]);
}
cleanDist.displayName = 'cleanDist';
gulp.task(cleanDist);

function genRename() {
  return gulp.src('./dist/generators/**/*')
    .pipe(gulp.dest('./generators'));
};

//Gulp Default
//let defaultTask = gulp.series(modules.clean, modules.server.config, gulp.parallel(modules.client.build, modules.server.build));
let defaultTask = gulp.series(clean, builder.build.src, genRename, cleanDist);
defaultTask.displayName = 'default';
gulp.task(defaultTask);

let test = gulp.series(builder.lint.all);
test.displayName = 'test';
gulp.task(test);
