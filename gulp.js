var gulp = require('gulp');
var source = require('vinyl-source-stream');
var watchify = require('watchify');
var livereload = require('gulp-livereload');

gulp.task('scripts', function() {
	var bundler = watchify('./public/js/app.js');

	bundler.on('update', rebundle);

	function rebundle() {
		return bundler.bundle()
			.pipe(source('bundle.js'))
			.pipe(gulp.dest('./public/dist/js/')).pipe(livereload());
	}

	return rebundle();
});

gulp.task('default', ['scripts']);