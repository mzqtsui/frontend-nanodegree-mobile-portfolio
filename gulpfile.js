//https://github.com/udacity/fend-office-hours/tree/master/Front%20End%20Tools/Gulp

var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    minifyhtml = require('gulp-minify-html'),
    minifycss = require('gulp-minify-css'),
    babel = require('gulp-babel'),
    webserver = require('gulp-webserver'),
    sourcemaps = require('gulp-sourcemaps'),
    responsive = require('gulp-responsive');


var paths = {
    scripts: ['src/js/**/*.js'],
    styles: ['src/css/**/*.scss'],
    images: ['src/img/**/*'],
    content: ['src/*.html']
}

gulp.task('views', function() {
    gulp.src('src/views/*.html')
        .pipe(minifyhtml())
        .pipe(gulp.dest('dist/views'));

    gulp.src('src/views/js/main.js')
        .pipe(uglify())
        .pipe(gulp.dest('dist/views/js'));

    gulp.src('src/views/images/*')
        .pipe(responsive({
            'pizzeria.jpg': [
            {
                width: 100,
                rename: { suffix: '_100'}
            },
            {
                width: 320,
                rename: { suffix: '_320'}
            },
            {
                width: 480,
                rename: { suffix: '_480'}
            },
            {
                width: 960,
                rename: { suffix: '_960'}
            }],
            'pizza.png': [
            {
                width: '100%'
            }]
        },
        {
            quality: 50,
            withMetadata: false
        }))
        .pipe(gulp.dest('dist/views/images/'));

    gulp.src('src/views/css/*.css')
        .pipe(minifycss())
        .pipe(gulp.dest('dist/views/css/'));
});

gulp.task('scripts', function() {
    gulp.src(paths.scripts)
        .pipe(uglify())
        // .pipe(sourcemaps.init())
        // .pipe(babel({
        //     presets: ['es2015']
        // }))
        // .pipe(concat('app.js'))
        // .pipe(sourcemaps.write('.'))
        // .pipe(rename('app.min.js'))
        .pipe(gulp.dest('dist/js/'));
});

gulp.task('styles', function() {
    gulp.src(paths.styles)
        .pipe(sass({ outputStyle: 'compressed'}))
        .pipe(minifycss())
        .pipe(gulp.dest('dist/css'));
});

gulp.task('content', function(){
    return gulp.src(paths.content)
        .pipe(minifyhtml({
            empty: true,
            quotes: true
        }))
        .pipe(gulp.dest('dist/'));
});

gulp.task('images', function() {
    return gulp.src(paths.images)
        .pipe(responsive({
            '*.jpg': [
            {
                width: '100%'
            }],
            '*.png': [
            {
                width: '100%'
            }]
        },
        {
            quality: 50,
            withMetadata: false
        }))
        .pipe(gulp.dest('dist/img'));
});

gulp.task('watch', function() {
    gulp.watch(paths.scripts, ['scripts']);
    gulp.watch(paths.styles, ['styles']);
    gulp.watch(paths.content, ['content']);
    gulp.watch(paths.images, ['images']);
});

gulp.task('webserver', function() {
    gulp.src('dist/')
        .pipe(webserver({
            livereload: true,
            port: 9000
        }));
});




gulp.task('default', ['webserver','watch','scripts', 'styles', 'content', 'images','views']);