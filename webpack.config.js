module.exports = {
	mode: "development",
	entry: {
		app: "./dist/client/scripts/app.js",
		pokemon: "./dist/client/scripts/pokemon.js",
		pokemonTypes: "./dist/client/scripts/pokemonTypes.js",
		pokemonMoves: "./dist/client/scripts/pokemonMoves.js",
	},
	devtool: "source-map",
	output: {
		filename: "[name].js",
		library: "[name]",
	},
};
