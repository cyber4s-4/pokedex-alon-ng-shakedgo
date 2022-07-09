const fs = require("fs");
const folderPath = "./api/moves";

let allmoves = fetch("https://pokeapi.co/api/v2/move?limit=10000")
	.then((res) => res.json())
	.then((res) => res["results"])
	.then((res) => res.map((move) => move.url));

allmoves.then(run);

const timer = (ms) => new Promise((res) => setTimeout(res, ms));

async function run(moves) {
	for (const move of moves) {
		let data = await fetch(move).then((res) => res.json());
		let name = data.name.toString();
		fs.writeFileSync(folderPath + "/" + name + ".json", JSON.stringify(data));
		await timer(5000);
		console.log(name);
	}
}
