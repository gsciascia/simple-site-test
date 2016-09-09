var gulp = require('gulp');
var browserSync = require('browser-sync').create();
// Requires the gulp-sass and autoprefix  plugin
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');



// the defaults task that are call
gulp.task('appEnv', ['watch','browserSync','styles'], function() {});

// the defaults task that are call
gulp.task('distEnv', ['copy-html','copy-images']);




// Live reload for our app folder
gulp.task('browserSync', function() {
    browserSync.init({
        server: {
            baseDir: 'app'
        },
    })
})



// Gulp watch these files and please do something :)
gulp.task('watch', ['browserSync'],function(){
    // Watch changes in sass folder
    gulp.watch('app/scss/**/*.scss', ['styles']);
    // Reloads the browser whenever HTML or JS files change
    gulp.watch('app/*.html', browserSync.reload);


})


gulp.task('styles', function () {
    return gulp.src('app/scss/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('app/css/'))
        .pipe(browserSync.reload({
            stream: true
        }))
});


gulp.task('sass', function(){
    return gulp.src('app/scss/**/*.scss')
        .pipe(sass()) // Converts Sass to CSS with gulp-sass
        .pipe(gulp.dest('app/css'))
});


gulp.task('copy-html', function() {
    gulp.src('app/*.html')
        .pipe(gulp.dest('dist'));
});

gulp.task('copy-images', function() {
    gulp.src('app/images/*')
        .pipe(gulp.dest('dist/images'));
});