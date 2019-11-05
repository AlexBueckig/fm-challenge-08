const gulp = require('gulp');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync').create();
const ts = require('gulp-typescript');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const tsify = require('tsify');
const glob = require('glob').sync;
const terser = require('gulp-terser');
const uglifyify = require('uglifyify');

const paths = {
  pages: ['./*.html'],
  images: ['./images/*']
};

/**********************************************************/
/* CSS / SCSS                                             */
/**********************************************************/

const style = () => {
  return gulp
    .src('./scss/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./css'))
    .pipe(browserSync.stream());
};

const buildStyle = () => {
  return gulp
    .src('./scss/**/*.scss')
    .pipe(sass())
    .pipe(postcss([require('autoprefixer')(), require('cssnano')()]))
    .pipe(gulp.dest('./dist/css'));
};

/**********************************************************/
/* Javascript / Typescript                                */
/**********************************************************/

const bundle = () => {
  return browserify({
    basedir: '.',
    debug: true,
    entries: glob('./src/**/*.*'),
    cache: {},
    packageCache: {}
  })
    .plugin(tsify)
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('./'));
};

const buildBundle = () => {
  process.env.NODE_ENV = 'production';

  return browserify({
    basedir: '.',
    debug: true,
    entries: ['./src/react/main.tsx'],
    cache: {},
    packageCache: {}
  })
    .plugin(tsify)
    .transform('babelify', {
      presets: [['@babel/preset-env', {}], '@babel/preset-react'],
      extensions: ['.ts', '.tsx']
    })
    .transform(uglifyify)
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(
      terser({
        mangle: true,
        compress: true
      })
    )
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('dist'));
};

/**********************************************************/
/* Misc                                                   */
/**********************************************************/

const copyHtml = () => {
  return gulp.src(paths.pages).pipe(gulp.dest('dist'));
};

const copyImages = () => {
  return gulp.src(paths.images).pipe(gulp.dest('dist/images'));
};

const watch = () => {
  browserSync.init({
    server: {
      baseDir: './'
    }
  });
  style();
  bundle();
  gulp.watch('./scss/**/*.scss', style);
  gulp.watch('./src/**/*.{ts,tsx}', bundle);
  gulp.watch('./**/*.html').on('change', browserSync.reload);
  gulp.watch('./bundle.js').on('change', browserSync.reload);
};

/**********************************************************/
/* Exports                                                */
/**********************************************************/

exports.default = watch;
exports.build = gulp.series(copyHtml, copyImages, buildStyle, buildBundle);
