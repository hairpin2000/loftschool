const gulp=require('gulp');
const pug=require('gulp-pug');
const del=require('del');
const browserSync=require('browser-sync').create();

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
    },
    images: {
        src: 'src/images/**/*.*',
        dest: 'build/assets/images/'
    },
    icons: {
        src: 'src/icons/**/*.*',
        dest: 'build/assets/icons/'
    },
    fonts: {
        src: 'src/fonts/**/*.*',
        dest: 'build/assets/fonts/'
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
    gulp.watch(paths.images.src, images);
    gulp.watch(paths.icons.src, icons);
    gulp.watch(paths.fonts.src, fonts);
} 

//эмуляция виртуального сервера
function server() {
    browserSync.init({
        server: paths.root
    });
    browserSync.watch(paths.root + '/**/*.*', browserSync.reload);
}

function images() {
    return gulp.src(paths.images.src)
        .pipe.dest(paths.images.dest);
}

function icons() {
    return gulp.src(paths.icons.src)
        .pipe.dest(paths.icons.dest);
}

function fonts() {
    return gulp.src(paths.fonts.src)
        .pipe.dest(paths.fonts.dest);
}

exports.templates=templates;
exports.styles=styles;
exports.del=del;
exports.images=images;
exports.icons=icons;
exports.fonts=fonts;

gulp.task('default', gulp.series(
    gulp.parallel(styles, templates, images, icons,fonts),
    gulp.parallel(watch,server)
));

gulp.task('build', gulp.series(
    clean,
    gulp.parallel(styles, templates,  images, icons,fonts)
));