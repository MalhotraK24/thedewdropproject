// --------------------------------------------------------
// Dependencies
// --------------------------------------------------------

// Utils...
const gulp = require("gulp"),
  del = require("del"),
  shell = require("gulp-shell"),
  data = require("gulp-data"),
  nunjucksRender = require("gulp-nunjucks-render");

// Image...
const imagemin = require("imagemin"),
  imageminWebp = require("imagemin-webp"),
  imageminOptipng = require("imagemin-optipng"),
  imageminJpegtran = require("imagemin-jpegtran"),
  imageminMozjpeg = require("imagemin-mozjpeg"),
  imageminPngquant = require("imagemin-pngquant");

// CSS...
const cleanCSS = require("gulp-clean-css");

// JS...
const uglifyJS = require("gulp-uglify");

// HTML
const htmlmin = require("gulp-htmlmin");

// --------------------------------------------------------
// Configuration
// --------------------------------------------------------

// Root directories...
const root = {
  src: "src/", // Source code 'root'
  dist: "dist/", // Distribution code 'root'
};

// Code location paths...
const paths = {
  styles: {
    src: `${root.src}css/`,
    dist: `${root.dist}assets/css/`,
    plugins: {
      src: `${root.src}css/plugins/`,
      dist: `${root.dist}assets/css/plugins/`,
    },
  },
  scripts: {
    src: `${root.src}js/`,
    dist: `${root.dist}assets/js/`,
    plugins: {
      src: `${root.src}js/plugins/`,
      dist: `${root.dist}assets/js/plugins/`,
    },
  },
  images: {
    src: `${root.src}assets/images/`,
    dist: `${root.dist}assets/images/`,
  },
  html: {
    src: `${root.src}`,
    dist: `${root.dist}`,
  },
};

// --------------------------------------------------------
// Tasks
// --------------------------------------------------------

// Clean / delete the 'dist' directory...
function cleanDist() {
  return del([root.dist]);
}

// Styles minify...
function stylesMin() {
  return gulp
    .src([
      `${paths.styles.src}**/*.css`,
      `!${paths.styles.plugins.src}**/*.css`,
    ]) // Ignore the vendor JS])
    .pipe(cleanCSS({ compatibility: "ie8" }))
    .pipe(gulp.dest(paths.styles.dist));
}

// Copy JS Vendor files...
function stylesPlugins() {
  return gulp
    .src([
      // [Option A]: Grab all vendor script files...
      `${paths.styles.plugins.src}**/*.css`,
    ])
    .pipe(gulp.dest(paths.styles.plugins.dist));
}

function scriptsMin() {
  return gulp
    .src([
      `${paths.scripts.src}**/*.js`, // All the custom JS
      `!${paths.scripts.plugins.src}**/*.js`, // Ignore the vendor JS
    ])
    .pipe(uglifyJS())
    .pipe(gulp.dest(paths.scripts.dist));
}

// Copy JS Vendor files...
function scriptsPlugins() {
  return gulp
    .src([
      // [Option A]: Grab all vendor script files...
      `${paths.scripts.plugins.src}**/*.js`,
    ])
    .pipe(gulp.dest(paths.scripts.plugins.dist));
}

function html() {
  // Gets .html and .nunjucks files in pages
  return (
    gulp
      .src(`${paths.html.src}pages/**/*.+(html|njk)`)
      // Adding data to Nunjucks
      .pipe(
        data(function () {
          return require("./src/datasources/data.json");
        })
      )
      // Renders template with nunjucks
      .pipe(
        nunjucksRender({
          path: ["src/templates"],
        })
      )
      // output files in app folder
      .pipe(gulp.dest("dist"))
  );
}

// HTML minify...
function htmlMin() {
  return gulp
    .src(`${paths.html.dist}**/*.html`)
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest(paths.html.dist));
}

// Copy already optimised images...
function images() {
  return gulp.src(`${paths.images.src}**/*`).pipe(gulp.dest(paths.images.dist));
}

// Copy various files...
function copyMisc() {
  return gulp
    .src(
      [
        `${root.src}assets/fonts/**/*`,
        `${root.src}datasources/*.json`,
        `${root.src}/manifest.json`,
        `${root.src}/serviceworker*.js`, // All service worker files in the root directory
      ],
      { base: root.src }
    )
    .pipe(gulp.dest(root.dist));
}

const publishSet = gulp.series(
  cleanDist,
  stylesMin,
  scriptsMin,
  html,
  htmlMin,

  // Parallel tasks...
  gulp.parallel(stylesPlugins, scriptsPlugins, images, copyMisc)
);

// A 'shell' task placeholder for now...
gulp.task("messageStart", shell.task("echo Site is building..."));
gulp.task("messageEnd", shell.task("echo Site is finished building."));
gulp.task("publish", gulp.series("messageStart", publishSet, "messageEnd")); // Full build ('optimised' - ie. ready for production)

// Minify CSS
// const cleanCSS = require("gulp-clean-css");

// gulp.task("minify-css", () => {
//   return gulp
//     .src("CSS/*.css")
//     .pipe(cleanCSS({ compatibility: "ie8" }))
//     .pipe(gulp.dest("css-dist"));
// });

// Compress PNGImages
// const PNGImages = "Images/Icons/*.png";
// const output = "Gallery/Icons";

// gulp.task("compress-png-images", () => {
//   imagemin([PNGImages], {
//     destination: output,
//     plugins: [imageminPngquant({ quality: [0.3, 0.5] })],
//   })
//     .then(console.log("Compression successful!"))
//     .catch((error) => console.log(error));
// });

//Compress JPGImages
// const JPEGImages = "src/assets/images/Banners/testimonials.{jpg,jpeg}";
// const output = "dist/assets/images/Banners";

// gulp.task("compress-jpg-images", () => {
//   imagemin([JPEGImages], {
//     destination: output,
//     plugins: [
//       imageminMozjpeg({
//         quality: 50,
//         progressive: true,
//       }),
//     ],
//   })
//     .then(console.log("Compression successful!"))
//     .catch((error) => console.log(error));
// });

// Resize Images to 225x225
// const fs = require("fs");
// const resizeImg = require("resize-img");
// gulp.task("resize-images", () => {
//   const image = resizeImg(fs.readFileSync("Images/Icons/ht-logo.jpeg"), {
//     width: 225,
//     height: 225,
//   });
//   fs.writeFileSync("Images/Icons/ht-logo.jpeg", image);
// });

// Old method to compress images
// exports.default = () => (
// 	gulp.src('./Old Gallery/*.{jpg,png}')
// 		.pipe(imagemin(['./Old Gallery/*.{jpg,png}'], './Gallery', {
// 			use: [
// 				imageminWebp({quality: 50})
// 			]
// 		}))
// 		.pipe(gulp.dest('./Gallery'))
// );
