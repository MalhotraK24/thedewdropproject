var gulp = require("gulp");
var nunjucksRender = require("gulp-nunjucks-render");

const imagemin = require("imagemin");
const imageminWebp = require("imagemin-webp");
const imageminOptipng = require("imagemin-optipng");
const imageminJpegtran = require("imagemin-jpegtran");
const imageminMozjpeg = require("imagemin-mozjpeg");
const imageminPngquant = require("imagemin-pngquant");

gulp.task("nunjucks", function () {
  // Gets .html and .nunjucks files in pages
  return (
    gulp
      .src("app/pages/**/*.+(html|njk)")
      // Renders template with nunjucks
      .pipe(
        nunjucksRender({
          path: ["app/templates"],
        })
      )
      // output files in app folder
      .pipe(gulp.dest("dist"))
  );
});

// Minify CSS
const cleanCSS = require("gulp-clean-css");

gulp.task("minify-css", () => {
  return gulp
    .src("CSS/*.css")
    .pipe(cleanCSS({ compatibility: "ie8" }))
    .pipe(gulp.dest("css-dist"));
});

// Compress PNGImages
const PNGImages = "Images/Icons/*.png";
const output = "Gallery/Icons";

gulp.task("compress-png-images", () => {
  imagemin([PNGImages], {
    destination: output,
    plugins: [imageminPngquant({ quality: [0.3, 0.5] })],
  })
    .then(console.log("Compression successful!"))
    .catch((error) => console.log(error));
});

// Compress JPGImages
const JPEGImages = "Images/Icons/{nbt|ht}-logo.{jpg,jpeg}";

gulp.task("compress-jpg-images", () => {
  imagemin([JPEGImages], {
    destination: output,
    plugins: [
      imageminMozjpeg({
        quality: 50,
        progressive: true,
      }),
    ],
  })
    .then(console.log("Compression successful!"))
    .catch((error) => console.log(error));
});

// Resize Images to 225x225
const fs = require("fs");
const resizeImg = require("resize-img");
gulp.task("resize-images", () => {
  const image = resizeImg(fs.readFileSync("Images/Icons/ht-logo.jpeg"), {
    width: 225,
    height: 225,
  });
  fs.writeFileSync("Images/Icons/ht-logo.jpeg", image);
});

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
