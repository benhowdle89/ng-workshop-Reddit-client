var gulp = require('gulp');
var source = require('vinyl-source-stream');
var watchify = require('watchify');
var livereload = require('gulp-livereload');

gulp.task('scripts', function() {
	var bundler = watchify('./app.js');

	bundler.on('update', rebundle);

	function rebundle() {
		return bundler.bundle()
			.pipe(source('app.js'))
			.pipe(gulp.dest('./dist/js/')).pipe(livereload());
	}

	return rebundle();
});

gulp.task('default', ['scripts']);