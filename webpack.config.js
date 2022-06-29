module.exports = {
	mode: "development",
	entry: {
		app: "./dist/tsc/app.js",
		pokemon: "./dist/tsc/pokemon.js",
	},
	devtool: "source-map",
	output: {
		filename: "[name].js",
		library: "[name]",
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				enforce: "pre",
				use: ["source-map-loader"],
			},
		],
	},
};
