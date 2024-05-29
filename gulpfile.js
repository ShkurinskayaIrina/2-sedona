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
import imagemin, {gifsicle, mozjpeg, optipng, svgo} from 'gulp-imagemin';
import { deleteAsync }from 'del';
import webp from 'gulp-webp';
import svgstore from 'gulp-svgstore';
import browser from 'browser-sync';

// Styles
const styles = () => gulp.src('public/sass/style.scss')
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
const html = () => gulp.src('public/*.html')
  .pipe(htmlmin({ collapseWhitespace: true }))
  .pipe(gulp.dest('build'));

//Script
const script = () =>
  gulp.src('public/js/**/*.js')
    .pipe(terser())
    .pipe(rename((path) => {
      path.extname = '.min.js';
    }))
    .pipe(gulp.dest('build/js'));

//Images
const optimizeImages = () =>
  gulp.src('public/img/**/*{jpg,png,svg}')
    .pipe(imagemin([
      gifsicle({interlaced: true}),
      mozjpeg({quality: 75, progressive: true}),
      optipng({optimizationLevel: 5}),
      svgo({
        plugins: [
          {
            name: 'cleanupIDs',
            active: false
          }
        ]
      })
    ]))
    .pipe(gulp.dest('build/img'));

const copyImages = () =>
  gulp.src('public/img/**/*.{jpg,png,svg}')
    .pipe(gulp.dest('build/img'));

// WebP
const createWebp = () =>
  gulp.src([
    'public/img/**/*.{jpg,png}',
    '!public/img/favicons/*.{svg,png}',
  ])
    .pipe(webp({quality: 90}))
    .pipe(gulp.dest('build/img'));

// Sprite - сборка из разных файлов одного спрайта
const sprite = () => gulp.src('build/img/icons/*.svg')
  .pipe(svgstore({
    inlineSvg: true
  }))
  .pipe(rename('sprite.svg'))
  .pipe(gulp.dest('build/img'));

// Copy
const copy = (done) => {
  gulp.src([
    'public/fonts/**/*.{woff2,woff}',
    'public/*.ico',
    'public/img/**/*.svg',
    '!public/img/icons/*.svg',
    'public/video/*.mp4',
    'public/manifest.webmanifest'
  ], {
    base: 'public'
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
  gulp.watch('public/sass/**/*.scss', gulp.series(styles));
  gulp.watch('public/js/**/*.js', gulp.series(script));
  gulp.watch('public/*.html', gulp.series(html, reload));
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
    sprite,
    createWebp
  ),
);

// Default
export default gulp.series (
  clean,
  copy,
  copyImages,
  gulp.parallel (
    styles,
    html,
    script,
    sprite,
    createWebp
  ),
  gulp.series (
    server,
    watcher
  ));
