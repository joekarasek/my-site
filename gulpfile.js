'use strict';  // Why use strict mode? See http://www.w3schools.com/js/js_strict.asp

////////////////////// Variables and Dependencies ////////////////////

var gulp = require('gulp');
var shell = require('gulp-shell');
var browserSync = require('browser-sync').create();
var config = require('./gulpconfig.json');
var sass = require('gulp-sass');
var sassGlob = require('gulp-sass-glob');
var rename = require('gulp-rename');
var execSync = require('child_process').execSync;
var imagemin = require('gulp-imagemin');
var babel = require('gulp-babel');

// run shell commands with `sh('ls')`;
function sh(cmd) {
  var result = execSync(cmd, {
    encoding: 'utf8'
  });
  console.log(result);
}

//////////////////////////////// SASS //////////////////////////////

gulp.task('scss', function () {
  return gulp.src(config.stylesheets)
    .pipe(sassGlob())
    .pipe(sass().on('error', sass.logError))
    .pipe(rename({dirname: './'}))
    .pipe(gulp.dest('_site/assets/'))
    .on('end', function() {
      browserSync.reload();
    });
});

gulp.task('scss:watch', function () {
  gulp.watch(config.stylesheets, ['scss']);
});

////////////////////////////// Jekyll ////////////////////////////

gulp.task('jekyll', function () {
  sh('bundle exec jekyll build --incremental');
  browserSync.reload();

});

gulp.task('jekyll:watch', function() {
  gulp.watch([
    '_includes/**',
    '_layouts/**',
    '_posts/**',
    '_projects/**',
    'index.html'
  ], [ 'jekyll' ]);
});

/////////

gulp.task('imgs', function() {
  return gulp.src('_assets/imgs/**/*.{jpg,jpeg}')
  .pipe(imagemin())
  .pipe(gulp.dest('_site/assets/imgs'));
});

gulp.task('imgs:watch', function () {
  gulp.watch('_assets/imgs/**', ['imgs']);
});

/////////

gulp.task('js', () => {
	return gulp.src('_js/*.js')
		.pipe(babel({
			presets: ['es2015']
		}))
		.pipe(gulp.dest('_site/js'));
});

gulp.task('js:watch', ['js'], function () {
  gulp.watch('_js/*.js', ['js']);
});


// gulp.task('module:watch', function() {
//   gulp.watch(config.modules, ['drushCacheClear'], function() {
//     browserSync.reload();
//   });
// });



// gulp.task('theme:watch', function() {
//   gulp.watch(config.themes, ['drushCacheClear'], function() {
//     browserSync.reload();
//   });
// });

gulp.task('watch', [
  'scss:watch',
  'jekyll:watch',
  'imgs:watch',
  'js:watch'
]);


////////////////////// Build ////////////////////

gulp.task('build', [
  'scss',
  'jekyll',
  'imgs',
  'js'
]);

gulp.task('serve', function() {
  // Initiate browserSync
  browserSync.init({
    server: {
      baseDir: "./_site"
    }
  });
});
////////////////////// Default: Serve and Watch ////////////////////

gulp.task('default', [
  'watch',
  'serve'
]);
