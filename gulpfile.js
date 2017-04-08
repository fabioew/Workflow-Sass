var gulp = require('gulp');
var htmlmin = require('gulp-htmlmin');

//Minificando o HTML
gulp.task('html-minificado', function() {
    gulp.src('./source/index.html')
      .pipe(htmlmin({collapseWhitespace: true}))
      .pipe(gulp.dest('./dist/'));
});

//Background - Tarefas de fundo
gulp.task('background', function() {
    gulp.watch('./source/index.html', ['html-minificado']);
});

//Gulp padrão
gulp.task('default',['html-minificado', 'background']);