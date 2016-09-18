var gulp   = require('gulp'),
	sass   = require('gulp-sass'),
	jade   = require('gulp-jade'),
	server = require('gulp-server-livereload');

gulp.task('style', function () {
	return gulp.src('./sass/*.scss')
	.pipe(sass())
	.pipe(autoprefixer({ browsers: ['last 8 versions', 'ie'] }))
	.pipe(gulp.dest('./css/'));
});

gulp.task('jade', function() {
  var YOUR_LOCALS = {};
  gulp.src('./*.jade')
    .pipe(jade({ locals: YOUR_LOCALS }))
    .pipe(gulp.dest('./'))
});

gulp.task('webserver', function() {
	return gulp.src('./')
	.pipe(server({
		livereload: true,
		directoryListing: true,
		open: true
	}));
});

gulp.task('watch', function() {
	gulp.watch('./sass/*.scss', ['style']);
	gulp.watch('./*.jade', ['jade']);
});

gulp.task('default', ['watch', 'webserver']);
