var gulp = require('gulp'),
	concat = require('gulp-concat'),
	rename =  require('gulp-rename'),
	watch = require('gulp-watch')
	;

gulp.task('default', ['build'], function () {
	
});

gulp.task('build', function () {
	gulp.src(['src/**'])
		.pipe(concat('uom.js'))
		.pipe(gulp.dest('dist'));
});

gulp.task('watch', function () {
	gulp.watch('src/**/*.js', function () {
		gulp.run('build');
	});
});