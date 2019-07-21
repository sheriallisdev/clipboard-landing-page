const gulp = require("gulp");
const sass = require("gulp-sass");
const browserSync = require("browser-sync").create();
const sourcemaps = require("gulp-sourcemaps");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");

// compile scss into css

function style() {
  // location of scss file
  return (
    gulp
      .src("./src/scss/**/*.scss")
      // sourcemaps init
      .pipe(sourcemaps.init())
      // pass through sass compiler
      .pipe(sass().on("error", sass.logError))
      // autoprefixer
      .pipe(postcss([autoprefixer()]))
      //sourcemaps write
      .pipe(sourcemaps.write("."))
      // location of compiled CSS
      .pipe(gulp.dest("./css"))
      // stream changes to all browsers
      .pipe(browserSync.stream())
  );
}

function watch() {
  browserSync.init({
    server: {
      baseDir: "./"
    }
  });
  gulp.watch("./src/scss/**/*.scss", style);
  gulp.watch("./*.html").on("change", browserSync.reload);
  gulp.watch("./src/js/**/*.js").on("change", browserSync.reload);
}

exports.style = style;
exports.watch = watch;
