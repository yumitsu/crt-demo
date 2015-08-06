var gulp       = require('gulp'),
    sass       = require('gulp-sass'),
    concat     = require('gulp-concat'),
    aprefixer  = require('autoprefixer-core'),
    postcss    = require('gulp-postcss'),
    livescript = require('gulp-livescript'),
    wiredep    = require('wiredep').stream,
    sassConfig = {
        includePaths: [require('path').resolve('./public/bower_components')]
    };

gulp.task('template', ['build:scss'], function () {
    gulp.src('src/index.html')
        .pipe(wiredep({
            directory: 'public/bower_components',
            ignorePath: '../public'
        }))
        .pipe(gulp.dest('./public'));
});

gulp.task('build:js', function (cb) {
    gulp.src('src/ls/*.ls')
        .pipe(livescript({bare: true}))
        .pipe(gulp.dest('public/javascripts'));
});

gulp.task('build:scss', function () {
    gulp.src('src/scss/*.scss')
        .pipe(concat('widget.css'))
        .pipe(sass(sassConfig))
        .pipe(postcss([
            aprefixer({
                browsers: ['last 3 versions']
            })
        ]))
        .pipe(gulp.dest('public/stylesheets'));
});

gulp.task('build', ['build:js', 'build:scss', 'template']);
