const gulp=require('gulp');
const pug=require('gulp-pug');

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
    return gulp.src('./src/styles/app.sass')
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(sourcemaps.write())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(paths.styles.dest))
    }

exports.templates=templates;
exports.styles=styles;