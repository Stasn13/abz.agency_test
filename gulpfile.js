const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync');
const concatCss = require('gulp-concat-css');
const autoprefixer = require('gulp-autoprefixer');
const imagemin = require('gulp-imagemin');
const cssmin = require('gulp-cssmin');
const rename = require('gulp-rename');
const minify = require('gulp-minify');


gulp.task('scss', function(){
    return gulp.src('src/styles/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('src/styles'))
        .pipe(browserSync.reload({stream:true}));
});

gulp.task('browser-sync',function() {
    browserSync({
        server:{
            baseDir:'src'
        },
        notify: false
    });
});

gulp.task("autoprefixer", function(){
    return gulp.src("src/styles/*.css")
    .pipe(autoprefixer({
        browsers:['last 2 versions'],
        cascade: false
    }))
    .pipe(gulp.dest('build/styles/'))
});

gulp.task('imagemin', () =>
    gulp.src('src/img/*')
        .pipe(imagemin())
        .pipe(gulp.dest('build/img'))
);

gulp.task('cssmin', function () {
    gulp.src('build/styles/*')
        .pipe(cssmin())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('build/styles/'));
});

gulp.task('compress', function () {
    gulp.src('src/js/*')
        .pipe(minify())
        .pipe(gulp.dest('build/js/'))
});

gulp.task('watch', ['browser-sync', 'scss'], function(){
    gulp.watch('src/styles/**/*.scss', ['scss']);
});