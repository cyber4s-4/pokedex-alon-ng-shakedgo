const fs = require("fs");
const pokemonFolderPath = "types";

let allTypes = fetch("https://pokeapi.co/api/v2/type?limit=100")
	.then((res) => res.json())
	.then((res) => res["results"])
	.then((res) => res.map((type) => type.url));

allTypes.then(run);

const timer = (ms) => new Promise((res) => setTimeout(res, ms));

async function run(types) {
	for (const type of types) {
		let data = await fetch(type).then((res) => res.json());
		let name = data.name.toString();
		fs.writeFileSync(pokemonFolderPath + "/" + name + ".json", JSON.stringify(data));
		await timer(10000);
		console.log(name);
	}
}
