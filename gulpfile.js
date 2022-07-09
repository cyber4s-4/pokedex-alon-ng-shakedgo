const open = require("open");
const gulp = require("gulp");
const clean = require("gulp-clean");
const rename = require("gulp-rename");
const webpack = require("webpack-stream");
const sass = require("gulp-sass")(require("sass"));
const { exec } = require("child_process");

const webpackConfig = require("./webpack.config.js");

// Removes previous dist
gulp.task("start", () => {
	return gulp.src("./dist", { allowEmpty: true }).pipe(clean());
});

// Creates js bundle from several js files
gulp.task("build", () => {
	return webpack(webpackConfig).pipe(gulp.dest("./dist"));
});

// Converts scss to css
gulp.task("scss", () => {
	return gulp.src("./src/**/*.scss").pipe(sass()).pipe(gulp.dest("./dist"));
});

// Transfers index
gulp.task("index", () => {
	return gulp.src(["./src/*.html", "./src/favicon.ico"]).pipe(gulp.dest("./dist"));
});

gulp.task("copy-express", () => {
	return gulp.src("./dist/tsc/express.js").pipe(gulp.dest("./dist"));
});

gulp.task("express", () => {
	const express = exec("nodemon ./dist/express.js");

	express.stdout.on("data", (data) => console.log(data));
	express.stderr.on("data", (data) => console.error(data));

	return express.on("close", (code) => console.log(`tsc exited with code ${code}`));
});

// Transfers images
gulp.task("images", () => {
	return gulp.src(["./src/images/**.png"]).pipe(gulp.dest("./dist/img"));
});

// Watch scss files
gulp.task("watch-scss", () => {
	return gulp.watch("./src/**/*.scss", gulp.series("scss"));
});

// Watch html files
gulp.task("watch-html", () => {
	return gulp.watch(["./src/*.html"], gulp.series("index"));
});

// Watch tsc files
gulp.task("watch-tsc", () => {
	return gulp.watch("./dist/tsc/**/*.js", gulp.series("build"));
});

// Watch tsc files
gulp.task("watch-express", () => {
	return gulp.watch("./dist/tsc/express.js", gulp.series("copy-express"));
});

// Initial ts compile
gulp.task("tsc", (cb) => {
	exec("tsc", (err, msg) => {
		cb();
	});
});

// Watch ts files and recompile
gulp.task("tsc-w", () => {
	console.log("test");
	exec("tsc -w");
});

gulp.task("open-browser", () => {
	return open("http://localhost:4000");
});

// Run all together
gulp.task(
	"default",
	gulp.series(
		"start",
		"scss",
		"index",
		"images",
		"tsc",
		"open-browser",
		"build",
		"copy-express",
		gulp.parallel("express", "watch-express", "watch-scss", "watch-html", "watch-tsc", "tsc-w")
	)
);
