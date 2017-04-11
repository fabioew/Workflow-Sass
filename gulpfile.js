var gulp = require('gulp');
var del = require('del');
var htmlmin = require('gulp-htmlmin');
var sass = require('gulp-sass');
var cleanCSS = require('gulp-clean-css');
var notify = require('gulp-notify');

//del
gulp.task('del', function() {
    del('./dist/css/*')
});

//Minificador do HTML.
gulp.task('html-minificado', function() {
  return gulp.src('./source/**/*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .on("error", notify.onError({message: "Error: <%= error.message %>", title: "Seu burru, vai revisar seu código"}))
    .pipe(gulp.dest('./dist/'));
});

//compilador e minificador de scss
gulp.task('scss-minificado', function() {
    return gulp.src('./source/scss/style.scss')
      .pipe(sass())
	    .on("error", notify.onError({message: "Error: <%= error.message %>", title: "Seu burru, vai revisar seu código"}))
      .pipe(cleanCSS())
      .pipe(gulp.dest('./dist/css/'));
});

gulp.task('background', function() {
    gulp.watch('./source/**/*.html', ['html-minificado']);
    gulp.watch('./source/scss/**/*.scss', ['scss-minificado']);
});


//Servidor de atualização do Browser
var browserSync = require('browser-sync').create();
var reload      = browserSync.reload;

// Watch scss AND html files, doing different things with each.
gulp.task('serve', function () {

    // Serve files from the root of this project
    browserSync.init({
        server: {
            baseDir: "./dist/"
        }
    });

    gulp.watch("./dist/**/*.html").on("change", reload);
    gulp.watch("./dist/**/*.css").on("change", reload);
});

gulp.task('default',[
  'serve',
	'scss-minificado',
	'html-minificado',
	'background',
]);