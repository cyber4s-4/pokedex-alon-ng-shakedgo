const fs = require("fs");
const folderPath = "./api/pokemons";

let allPokemons = fetch("https://pokeapi.co/api/v2/pokemon?offset=200&limit=10000")
	.then((res) => res.json())
	.then((res) => res["results"])
	.then((res) => res.map((pokemon) => pokemon.url));

allPokemons.then(run);

const timer = (ms) => new Promise((res) => setTimeout(res, ms));

async function run(pokemons) {
	for (const pokemon of pokemons) {
		let data = await fetch(pokemon).then((res) => res.json());
		let name = data.forms[0].name.toString();
		for (let move of data.moves) {
			delete move["version_group_details"];
		}
		fs.writeFileSync(folderPath + "/" + name + ".json", JSON.stringify(data));
		await timer(10000);
		console.log(name);
	}
}
