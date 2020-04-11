var gulp = require('gulp');
var imagemin = require('gulp-imagemin');

exports.default = () => (
	gulp.src('./Images/*/*')
		.pipe(imagemin())
        .pipe(gulp.dest('Gallery'))
);

// exports.default = () => (
// 	gulp.src('./Images/favicon_io/*')
// 		.pipe(imagemin())
//         .pipe(gulp.dest('Gallery/Icons/favicon_io'))
// );
