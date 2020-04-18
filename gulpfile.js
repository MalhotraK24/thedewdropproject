var gulp = require('gulp');
const imagemin = require('imagemin');
const imageminWebp = require('imagemin-webp');
const imageminOptipng = require('imagemin-optipng');
const imageminJpegtran = require('imagemin-jpegtran');
const imageminMozjpeg = require('imagemin-mozjpeg');
const imageminPngquant = require('imagemin-pngquant');

const PNGImages = 'Images/Icons/favicon_io/*.png';
const JPEGImages = 'Images/Icons/*.{jpg,jpeg}';
const output = 'Gallery/Icons/favicon_io';

// exports.default = () =>
//  imagemin([JPEGImages], {
// 	destination: output,
//     plugins: [ imageminMozjpeg({
// 		quality: 70,
// 		progressive: true,
//       }),
//     ]
//   })
//   .then(console.log("Compression successful!"))
//   .catch(error => console.log(error));

exports.default = () =>
 imagemin([PNGImages], {
  destination: output,
  plugins: [
	imageminPngquant({ quality: [0.65, 0.80] })
  ],
})
.then(console.log("Compression successful!"))
.catch(error => console.log(error));

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

// Method to compress jgp or jpeg images
// exports.default = async() => {
// 	const files = await imagemin(
// 		['Images/Pratishtha/*.jpg'],
// 		{
// 		  destination: 'Gallery/Pratishtha',
// 		  plugins: [imageminJpegtran()]
// 		}
// 	);
// 	console.log(files);
//   };

// Method to compress png images
// exports.default = async() => {
// 	const files = await imagemin(
// 		['Images/Icons/favicon_io/*.png'],
// 		{
// 		  destination: 'Gallery/Icons/favicon_io',
// 		  plugins: [imageminOptipng()]
// 		}
// 	);
// 	console.log(files);
//   };