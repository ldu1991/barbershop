'use strict';

var gulp            = require('gulp'),
    plumber         = require("gulp-plumber"),
    uglify          = require('gulp-uglify'),
    concat          = require('gulp-concat'),
    imagemin        = require('gulp-imagemin'),
    pngquant        = require('imagemin-pngquant'),
    sass            = require('gulp-sass'),
    sourcemaps      = require('gulp-sourcemaps'),
    autoprefixer    = require('gulp-autoprefixer'),
    cmq             = require('gulp-combine-mq'),
    csso            = require('gulp-csso'),
    spritesmith     = require('gulp.spritesmith'),
    watch           = require('gulp-watch'),
    gulpSequence    = require('gulp-sequence'),
    browserSync     = require('browser-sync').create(),
    upmodul         = require("gulp-update-modul"),
    update          = require('gulp-update')();

var path = {
    src: {
        sassAll: 'css/scss/**/*.scss',
        sassGen: 'css/scss/[^_]*.scss',
        js: 'js/libs/**/*.js',
        img: 'images/dev/**/*',
        imgSprite: 'images/sprites/*.*',
        imgSpritePath: 'images/sprite.png',
        files: '**/*.html',
        domain: 'agi.ld',
    },
    build: {
        css: 'css/',
        js: 'js/',
        img: 'images/',
        imgSprite: 'images/',
        scssSprite: 'css/scss/',
    }
};

var onError = function (e) {
    console.log(e);
    this.emit('end');
};

gulp.task('server', function() {
  browserSync.init({
        server: {
            baseDir: "./"
        }
  });

  browserSync.watch(path.src.files).on('change', browserSync.reload);
});

// development
gulp.task('sass:dev', function() {
    gulp.src(path.src.sassGen)
        .pipe(plumber({errorHandler: onError}))
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(path.build.css))
        .pipe(browserSync.stream());
});

// production
gulp.task('sass:prod', function() {
    gulp.src(path.src.sassGen)
        .pipe(plumber({errorHandler: onError}))
        .pipe(sass())
        .pipe(cmq({beautify: false}))
        .pipe(autoprefixer(['last 50 versions', '> 10%', 'safari 5', 'ie 7', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'ios 7', 'android 4'], {cascade: true}))
        .pipe(csso())
        .pipe(gulp.dest(path.build.css));
});

gulp.task('js', function() {
    gulp.src([path.src.js, 'js/main.js'])
        .pipe(plumber({errorHandler: onError}))
        .pipe(sourcemaps.init())
        .pipe(concat('scripts.js'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(path.build.js));

    gulp.src([path.src.js, 'js/main.js'])
        .pipe(plumber({errorHandler: onError}))
        .pipe(sourcemaps.init())
        .pipe(concat('scripts.min.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(path.build.js))
        .pipe(browserSync.stream());
});

gulp.task('img', function() {
    gulp.src(path.src.img)
        .pipe(imagemin({
            interlaced: true,
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe(gulp.dest(path.build.img));
});

gulp.task('sprite', function () {
    var spriteData =
        gulp.src(path.src.imgSprite)
            .pipe(plumber({errorHandler: onError}))
            .pipe(spritesmith({
                imgName: 'sprite.png',
                imgPath: path.build.imgSpritePath,
                cssTemplate: 'images/spritesmith.scsstemplate',
                cssName: '_sprite.scss',
                algorithm: 'binary-tree', //top-down
                cssFormat: 'scss_maps',
                padding: 20,
            }));

    spriteData.img.pipe(gulp.dest(path.build.imgSprite));
    return spriteData.css.pipe(gulp.dest(path.build.scssSprite)).pipe(browserSync.stream());
});

gulp.task('watch', function () {
	gulp.watch(path.src.sassAll, ['sass:dev']);
	gulp.watch([path.src.js, 'js/main.js'], ['js']);
    gulp.watch(path.src.imgSprite, ['sprite']);
    gulp.watch(path.src.img, ['img']);
});

gulp.task('dev', gulpSequence('sass:dev', 'js', 'img', ['watch', 'server']));

gulp.task('prod', ['sass:prod', 'js', 'img']);

gulp.task('update-modul', function () {
    gulp.src('package.json')
    .pipe(upmodul('latest, true'));
});

gulp.task('update', function () {
  gulp.watch('package.json').on('change', function (file) {
    update.write(file);
  });
})
