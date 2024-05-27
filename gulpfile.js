import gulp from 'gulp';
import plumber from 'gulp-plumber';
import sourcemap from 'gulp-sourcemaps';
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import sass from 'gulp-dart-sass';
import csso from 'postcss-csso';
import rename from 'gulp-rename';
import terser from 'gulp-terser';
import htmlmin from 'gulp-htmlmin';
import squoosh from 'gulp-libsquoosh';
import { deleteAsync }from 'del';
import browser from 'browser-sync';

// Styles
const styles = () => gulp.src('source/sass/style.scss')
  .pipe(plumber())
  .pipe(sourcemap.init())
  .pipe(sass())
  .pipe(postcss([
    autoprefixer(),
    csso()
  ]))
  .pipe(rename('style.min.css'))
  .pipe(sourcemap.write('.'))
  .pipe(gulp.dest('build/css'))
  .pipe(browser.stream());

// HTML
const html = () => gulp.src('source/*.html')
  .pipe(htmlmin({ collapseWhitespace: true }))
  .pipe(gulp.dest('build'));

//Script
const script = () =>
  gulp.src('source/js/*.js')
    .pipe(terser())
    .pipe(rename((path) => {
      path.extname = '.min.js';
    }))
    .pipe(gulp.dest('build/js'));

//Images
const optimizeImages = () => gulp.src('source/img/**/*{jpg,png,svg')
  .pipe(squoosh())
  .pipe(gulp.dest('build/img'));

// Copy
const copy = (done) => {
  gulp.src([
    'source/fonts/**/*.{woff2,woff}',
    'source/*.ico',
    'source/img/**/*.{jpg,png,svg,webp}',
    'source/video/**/*.{jpg,png,svg,webp}',
    'source/video/presentation.mp4',
    'source/manifest.webmanifest'
  ], {
    base: 'source'
  })
    .pipe(gulp.dest('build'));
  done();
};

// Clean
const clean = () => deleteAsync('build');

// Server
const server = (done) => {
  browser.init({
    server: {
      baseDir: 'build'
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
};

// Reload
const reload = (done) => {
  browser.reload();
  done();
};

// Watcher
const watcher = () => {
  gulp.watch('source/sass/**/*.scss', gulp.series(styles));
  gulp.watch('source/js/main.js', gulp.series(script));
  gulp.watch('source/*.html', gulp.series(html, reload));
};

// Build
export const build = gulp.series (
  clean,
  copy,
  optimizeImages,
  gulp.parallel (
    styles,
    html,
    script,
  ),
);

// Default
export default gulp.series (
  clean,
  copy,
  gulp.parallel (
    styles,
    html,
    script,
  ),
  gulp.series (
    server,
    watcher
  ));
