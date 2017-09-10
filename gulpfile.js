const gulp=require('gulp');
const pug=require('gulp-pug');
const del=require('del');

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

exports.templates=templates;
exports.styles=styles;
exports.del=del;

gulp.task('default', gulp.series(
    clean,
    gulp.parallel(styles,templates)
));