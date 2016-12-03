'use strict';

var gulp = require('gulp'),
    watch = require('gulp-watch'),
    babel = require('gulp-babel'),
    concat = require("gulp-concat"),
    prefixer = require('gulp-autoprefixer'),
    // pug = require('gulp-pug'),
    uglify = require('gulp-uglify'),
    less = require('gulp-less'),
    pathfs = require('path'),
    sourcemaps = require('gulp-sourcemaps'),
    rigger = require('gulp-rigger'),
    cssmin = require('gulp-cssnano'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    rimraf = require('rimraf'),
    browserSync = require("browser-sync"),
    reload = browserSync.reload;

var path = {
    build: {
        html: 'build/',
        js: 'build/js/',
        css: '../wp-content/themes/html5blank/',
        img: 'build/img/',
        fonts: 'build/fonts/',
        vendor: 'build/vendor/'
    },
    src: {
        html: ['src/html/**/*.html'],
        // pug: ['src/pug/**/*.pug'],
        js: ['src/js/**/*.js'],
        style: ['src/style/*.less'],
        img: 'src/img/**/*.*',
        fonts: 'src/fonts/**/*.*',
        vendor: 'src/vendor/**'
    },
    watch: {
        html: 'src/html/**/*.html',
        // pug: 'src/pug/**/*.pug',
        js: 'src/js/**/*.js',
        style: 'src/style/**/*.less',
        img: 'src/img/**/*.*',
        fonts: 'src/fonts/**/*.*',
        vendor: 'src/vendor/**/*.*'
    },
    clean: './build'
};

var config = {
    server: {
        baseDir: "./build"
    },
    tunnel: false,
    host: 'localhost',
    port: 9000,
    logPrefix: "kachurun"
};

gulp.task('webserver', function () {
    browserSync(config);
});

gulp.task('clean', function (cb) {
    rimraf(path.clean, cb);
});

// gulp.task('pug:build', function () {
//     gulp.src(path.src.pug)
//         .pipe(pug({
//             pretty: true
//         }))
//         .pipe(gulp.dest(path.build.html))
//         .pipe(reload({stream: true}));
// });
gulp.task('html:build', function () {
    gulp.src(path.src.html)
        .pipe(gulp.dest(path.build.html))
        .pipe(reload({stream: true}));
});

gulp.task('js:build', function () {
    gulp.src(path.src.js)
        .pipe(sourcemaps.init())
        .pipe(babel())
        .pipe(rigger())
        // .pipe(uglify())
        .pipe(concat("all.js"))
        .pipe(sourcemaps.write("."))
        .pipe(gulp.dest(path.build.js))
        .pipe(reload({stream: true}));
});

gulp.task('style:build', function () {
    gulp.src(path.src.style)
        .pipe(sourcemaps.init())
        .pipe(less({
            paths: [ pathfs.join(__dirname, 'less', 'includes') ]
        }))
        .pipe(prefixer())
        // .pipe(cssmin({zindex:false}))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.build.css))
        .pipe(reload({stream: true}));
});

gulp.task('image:build', function () {
    gulp.src(path.src.img)
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()],
            interlaced: true
        }))
        .pipe(gulp.dest(path.build.img))
        .pipe(reload({stream: true}));
});

gulp.task('fonts:build', function() {
    gulp.src(path.src.fonts)
        .pipe(gulp.dest(path.build.fonts));
});

gulp.task('vendor:build', function() {
    //gulp.copy(path.src.vendor, path.build.vendor);
    gulp.src(['src/vendor/**/*']).pipe(gulp.dest('build/vendor'));
});

gulp.task('build', [
    'html:build',
    // 'pug:build',
    'js:build',
    'style:build',
    'fonts:build',
    'image:build',
    'vendor:build'
]);


gulp.task('watch', function(){
    watch([path.watch.html], function(event, cb) {
        gulp.start('html:build');
    });
    // watch([path.watch.pug], function(event, cb) {
    //     gulp.start('pug:build');
    // });
    watch([path.watch.style], function(event, cb) {
        gulp.start('style:build');
    });
    watch([path.watch.js], function(event, cb) {
        gulp.start('js:build');
    });
    watch([path.watch.img], function(event, cb) {
        gulp.start('image:build');
    });
    watch([path.watch.fonts], function(event, cb) {
        gulp.start('fonts:build');
    });
    watch([path.watch.vendor], function(event, cb) {
        gulp.start('vendor:build');
    });
});


gulp.task('default', ['build', 'webserver', 'watch']);
