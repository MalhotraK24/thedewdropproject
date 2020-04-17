var gulp = require('gulp');
var imagemin = require('imagemin');
const imageminWebp = require('imagemin-webp');

// Old method to convert/minimize images
//	exports.default = () => (
// 	gulp.src('./Old Gallery/*.{jpg,png}')
// 		.pipe(imagemin(['./Old Gallery/*.{jpg,png}'], './Gallery', {
// 			use: [
// 				imageminWebp({quality: 50})
// 			]
// 		}))
// 		.pipe(gulp.dest('./Gallery'))
// );

// New method to convert/minimize images using the quality as a metric
exports.default = async() => {
	const files = await imagemin(
		['Images/*.{jpg,jpeg,png,ico}'],
		{
		  destination: 'Gallery',
		  plugins: [imageminWebp({quality: 50})]
		}
	);
	console.log(files);
  };