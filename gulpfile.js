import gulp from 'gulp';
import plumber from 'gulp-plumber';
import sass from 'gulp-dart-sass';
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import browser from 'browser-sync';

// Styles

export const styles = () => {
  return gulp.src('source/sass/style.scss', { sourcemaps: true })
    .pipe(plumber())
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(gulp.dest('build/css', { sourcemaps: '.' }))
    .pipe(browser.stream());
}

// HTML
export const html = () => {
  return gulp.src('source/*.html')
  .pipe(htmlmin( options: { collapseWhitespace: true }))
  .pipe(gulp.dest('build'));
}

// Scripts
export const scripts = () => {
  return gulp.src('source/js/*.js')
  .pipe(terser())
  .pipe(gulp.dest('build/js'));
}

// Images
export const images = () => {
  return gulp.src('source/images/**/*.{jpg,png}')
  .pipe(squoosh())
  .pipe(gulp.dest('build/images'));
}

// WebP
export const createWebp = () => {
  return gulp.src('source/images/**/*.{jpg,png}')
  .pipe(squoosh( encodeOptions: {
    webp: {}
  }))
  .pipe(gulp.dest('build/images'));
}

// SVG
export const svg = () => {
  return gulp.src('source/images/*.svg')
  .pipe(svgo())
  .pipe(gulp.dest('build/images'));
}

// export const sprite = () => {
//   return gulp.src('source/images/icons/*.svg')
//   .pipe(svgo())
//   .pipe(svgstore( config: {
//     InlineSvg: true
// }))
//   .pipe(rename( obj: 'sprite.svg'))
//   .pipe(gulp.dest('build/images'));
// }


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
}

// Watcher

const watcher = () => {
  gulp.watch('source/sass/**/*.scss', gulp.series(styles));
  gulp.watch('source/*.html').on('change', browser.reload);
}


export default gulp.series(
  styles, server, watcher
);
