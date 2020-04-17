var gulp = require('gulp');
const imagemin = require('imagemin');
const imageminWebp = require('imagemin-webp');
const imageminOptipng = require('imagemin-optipng');
const imageminJpegtran = require('imagemin-jpegtran');

// Old method to compress images
//	exports.default = () => (
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
// 		['Images/Pratishtha/*.{jpg,jpeg}'],
// 		{
// 		  destination: 'Gallery/Pratishtha',
// 		  plugins: [imageminJpegtran()]
// 		}
// 	);
// 	console.log(files);
//   };

// Method to compress png images
exports.default = async() => {
	const files = await imagemin(
		['Images/Icons/favicon_io/*.png'],
		{
		  destination: 'Gallery/Icons/favicon_io',
		  plugins: [imageminOptipng()]
		}
	);
	console.log(files);
  };