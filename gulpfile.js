'use strict';

var gulp = require('gulp'),
    watch = require('gulp-watch'),
    sourcemaps = require('gulp-sourcemaps'),
	uglify = require('gulp-uglify'),
	cleanCSS = require('gulp-clean-css'),
    browserSync = require("browser-sync"),
	less = require('gulp-less'),
	fileinclude = require('gulp-file-include');
   // reload = browserSync.reload;
	

var path = {
    build: { //Тут мы укажем куда складывать готовые после сборки файлы
        html: 'build/',
        js: 'build/js/',
        css: 'build/css/',
        images: 'build/images/',
        fonts: 'build/fonts/'
    },
    src: { //Пути откуда брать исходники
        html: 'src/*.html', //Синтаксис src/*.html говорит gulp что мы хотим взять все файлы с расширением .html
        js: 'src/js/*.js',//В стилях и скриптах нам понадобятся только main файлы
        style: 'src/css/main.less',
        images: 'src/images/**/*.*', //Синтаксис img/**/*.* означает - взять все файлы всех расширений из папки и из вложенных каталогов
        fonts: 'src/fonts/**/*.*'
    },
    watch: { //Тут мы укажем, за изменением каких файлов мы хотим наблюдать
        html: 'src/**/*.html',
        js: 'src/js/**/*.js',
        css: 'src/css/**/*.*ss',
        images: 'src/images/**/*.*',
        fonts: 'src/fonts/**/*.*'
    },
    clean: './build'
};
var config = {
    server: {
        baseDir: "./build"
    },
  /*  tunnel: true,*/
    host: 'localhost',
    port: 80,
    logPrefix: "shiziksma"
};

gulp.task('html:build', function () {
    return gulp.src(path.src.html) //Выберем файлы по нужному пути
		.pipe(fileinclude({
			prefix: '@@',
			basepath: '@file'
		}))
        .pipe(gulp.dest(path.build.html));
        //.pipe(reload({stream: true})); //И перезагрузим наш сервер для обновлений
});

gulp.task('js:build', function () {
   return gulp.src(path.src.js) //Найдем наш main файл
        .pipe(fileinclude({
			prefix: '@@',
			basepath: '@file'
		})) //Прогоним через rigger
        .pipe(sourcemaps.init()) //Инициализируем sourcemap
//        .pipe(uglify()) //Сожмем наш js
        .pipe(sourcemaps.write()) //Пропишем карты
        .pipe(gulp.dest(path.build.js)); //Выплюнем готовый файл в build
       // .pipe(reload({stream: true})); //И перезагрузим сервер
});
gulp.task('js:buildnosource', function () {
   return gulp.src(path.src.js) //Найдем наш main файл
        .pipe(fileinclude({
			prefix: '@@',
			basepath: '@file'
		})) //Прогоним через rigger
       // .pipe(uglify()) //Сожмем наш js
        .pipe(gulp.dest(path.build.js)); //Выплюнем готовый файл в build
});

gulp.task('css:build', function(){
  return gulp.src(path.src.style)
	.pipe(sourcemaps.init())
    .pipe(less())
	.pipe(cleanCSS({compatibility: 'ie8'}))
	.pipe(sourcemaps.write())
    .pipe(gulp.dest('build/css'));
   // .pipe(reload({stream: true})); //И перезагрузим сервер
});
gulp.task('css:buildnosource', function(){
  return gulp.src(path.src.style)
    .pipe(less())
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('build/css'));
});
gulp.task('static:build', function() {
    gulp.src(path.src.fonts).pipe(gulp.dest(path.build.fonts))
	return gulp.src(path.src.images).pipe(gulp.dest(path.build.images))
});

gulp.task('build',gulp.series('html:build', 'js:build','css:build', 'static:build'));
gulp.task('deploy',gulp.series('html:build', 'js:buildnosource','css:buildnosource', 'static:build'));
gulp.task('watch', function(){
    watch([path.watch.html], gulp.series('html:build'))
    watch([path.watch.css], gulp.series('css:build'))
    watch([path.watch.js], gulp.series('js:build'))
    watch([path.watch.fonts], gulp.series('static:build'))
    watch([path.watch.images], gulp.series('static:build'))
});
gulp.task('webserver', function () {
    browserSync(config);
});
gulp.task('default', gulp.series('build',gulp.parallel('webserver','watch')));