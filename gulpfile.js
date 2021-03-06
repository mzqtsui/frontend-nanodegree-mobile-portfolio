//https://github.com/udacity/fend-office-hours/tree/master/Front%20End%20Tools/Gulp

var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    minifyhtml = require('gulp-minify-html'),
    cleancss = require('gulp-clean-css'),
    babel = require('gulp-babel'),
    webserver = require('gulp-webserver'),
    sourcemaps = require('gulp-sourcemaps'),
    responsive = require('gulp-responsive'),
    critical = require('critical').stream;


var paths = {
    scripts: ['src/js/**/*.js'],
    styles: ['src/css/**/*.css'],
    images: ['src/img/**/*'],
    content: ['src/*.html']
}

gulp.task('view-images', function() {
    return gulp.src('src/views/images/*')
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
                width: 640,
                rename: { suffix: '_640'}
            },
            {
                width: 960,
                rename: { suffix: '_960'}
            }],
            'pizza.png': [
            {
                width: '100%'
            },
            {
                width: 80,
                rename: { suffix: '_80' }
            }]
        },
        {
            quality: 50,
            withMetadata: false
        }))
        .pipe(gulp.dest('dist/views/images/'));
});

gulp.task('views', function() {
    return gulp.src('src/views/pizza.html')
        .pipe(minifyhtml())
        .pipe(gulp.dest('dist/views'));
});

gulp.task('view-scripts', function() {
    return gulp.src('src/views/js/main.js')
        .pipe(uglify())
        .pipe(gulp.dest('dist/views/js'));
});

gulp.task('scripts', function() {
    return gulp.src(paths.scripts)
        .pipe(uglify())
        .pipe(gulp.dest('dist/js/'));
});

gulp.task('view-styles', function() {
    return gulp.src('src/views/css/*.css')
        .pipe(cleancss())
        .pipe(gulp.dest('dist/views/css/'));
});

gulp.task('styles', function() {
    return gulp.src(paths.styles)
        .pipe(cleancss())
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
    gulp.watch('src/views/*', ['views']);
});

gulp.task('webserver', ['critical'],function() {
    return gulp.src('dist/')
        .pipe(webserver({
            livereload: true,
            port: 9000
        }));
});

gulp.task('critical', ['content', 'scripts', 'styles', 'images'], function() {
    return gulp.src('dist/*.html')
        .pipe(critical({base: 'dist/',  inline: true, minify: true}))
        .pipe(gulp.dest('dist/'));
});

gulp.task('critical-views', ['views', 'view-images', 'view-scripts', 'view-styles'], function() {
    return gulp.src('dist/views/*.html')
        .pipe(critical({base: 'dist/views/',  inline: true, minify: true}))
        .pipe(gulp.dest('dist/views/'));
});


gulp.task('default', ['webserver','watch', 'critical', 'critical-views']);
// gulp.task('default', ['webserver','watch','views']);