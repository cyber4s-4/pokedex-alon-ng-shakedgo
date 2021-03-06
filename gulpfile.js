const open = require("open");
const gulp = require("gulp");
const clean = require("gulp-clean");
const webpack = require("webpack-stream");
const sass = require("gulp-sass")(require("sass"));
const del = require("del");
const { exec } = require("child_process");

const STATIC_FOLDER = "./dist/static";

// Removes previous dist
gulp.task("start", () => {
	return gulp.src("./dist", { allowEmpty: true }).pipe(clean());
});

// Transfers index
gulp.task("index", () => {
	return gulp.src(["./src/client/html/*.html", "./src/client/favicon.ico"]).pipe(gulp.dest(STATIC_FOLDER));
});

// Transfers pokemons
gulp.task("pokemons", () => {
	return gulp.src("./src/temp_pokemons/*.json").pipe(gulp.dest("./dist/temp_pokemons"));
});

// Converts scss to css
gulp.task("scss", () => {
	return gulp.src("./src/client/style/*.scss").pipe(sass()).pipe(gulp.dest(STATIC_FOLDER));
});

// Initial ts compile
gulp.task("tsc", (cb) => {
	exec("tsc", (err, msg) => {
		cb();
	});
});

// Packs js files
gulp.task("webpack", (cb) => {
	return gulp
		.src("./dist/client/scripts/*.js")
		.pipe(webpack(require("./webpack.config")))
		.pipe(gulp.dest("./dist/static/scripts"));
});

// Opens browser at localhost:4000
gulp.task("open-browser", async () => {
	return setTimeout(() => open("http://localhost:4000"), 3000);
});

// Executes express.js via nodemon
gulp.task("express", () => {
	const express = exec("node ./dist/server/express.js");

	express.stdout.on("data", (data) => console.log(data));
	express.stderr.on("data", (data) => console.error(data));

	return express.on("close", (code) => console.log(`tsc exited with code ${code}`));
});

// Watch html files
gulp.task("watch-html", () => {
	return gulp.watch(["./src/client/html/*.html"], gulp.series("index"));
});

// Watch scss files
gulp.task("watch-scss", () => {
	return gulp.watch("./src/client/style/*.scss", gulp.series("scss"));
});

// Watch ts files and recompile
gulp.task("tsc-w", () => {
	exec("tsc -w");
});

// Watch tsc files
gulp.task("watch-tsc", () => {
	return gulp.watch("./dist/**/*.js", gulp.series("webpack"));
});

// Run all together
gulp.task(
	"default",
	gulp.series(
		"start",
		"scss",
		"index",
		"pokemons",
		"tsc",
		"webpack",
		// "open-browser",
		gulp.parallel("express", "watch-scss", "watch-html", "watch-tsc", "tsc-w")
	)
);

// Removes previous deploy
gulp.task("start-deploy", () => {
	return del("./deploy/src");
});

// Copy dist folder to deploy
gulp.task("create-deploy", () => {
	gulp.src(["package.json", "package-lock.json", ".gitignore", "Procfile"]).pipe(gulp.dest("./deploy"));
	gulp.src("./dist/**/*").pipe(gulp.dest("./deploy/src"));
	gulp.src("./src/temp_pokemons/*.json").pipe(gulp.dest("./deploy/src/temp_pokemons"));
	return gulp.src("./dist/static/scripts/*").pipe(gulp.dest("./deploy/src/static/scripts"));
});

// Deleted unused deploy files
gulp.task("delete-unused", () => {
	return del(["./deploy/src/cache", "./deploy/src/client", "./deploy/**/*.map"], { force: true });
});

// Run all together
gulp.task("deploy", gulp.series("start", "scss", "index", "tsc", "webpack", "start-deploy", "create-deploy", "delete-unused"));
