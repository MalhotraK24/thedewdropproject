var gulp = require('gulp');
var imagemin = require('gulp-imagemin');

exports.default = () => (
	gulp.src('./Images/*/*')
		.pipe(imagemin())
        .pipe(gulp.dest('Gallery'))
);