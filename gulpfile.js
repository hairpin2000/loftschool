const gulp=require('gulp');
const pug=require('gulp-pug');
const del=require('del');
const browserSync=require('browser-syns').create();

//styles
const sass=require('gulp-sass');
const rename=require('gulp-rename');
const sourcemaps=require('gulp-sourcemaps');

const paths={
    root: './build',
    templates: {
        pages: 'src/templates/pages/*.pug',
        src: 'src/templates/**/*.pug',
        dest: 'build/assets/'
    },
    styles: {
        src: 'src/styles/**/*.sass',
        dest: 'build/assets/styles'
    }
}

//pug
function templates() {
    return gulp.src(paths.templates.pages)
        .pipe(pug({pretty: true}))
        .pipe(gulp.dest(paths.root));
}

//sass
function styles() {
    return gulp.src('./src/styles/app.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(sourcemaps.write())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(paths.styles.dest))
    }

//del
function clean() {
    return del(paths.root);
}

//отслеживаем изменение исходников, вносим изменения в templates
function watch() {
    gulp.watch(paths.styles.src, styles);
    gulp.watch(paths.templates.src, templates);
} 

//ff
function server() {
    browserSync.init({
        server: paths.poot
    });
    browserSync.watch(paths.root + '/**/*.*', browserSync.reload);
}

exports.templates=templates;
exports.styles=styles;
exports.del=del;

gulp.task('default', gulp.series(
    gulp.parallel(styles,templates),
    gulp.parallel(watch,server)
));

gulp.task('build', gulp.series(
    clean,
    gulp.parallel(styles,templates)
));