const fs = require("fs/promises");
const MongoClient = require("mongodb").MongoClient;

const url = `mongodb+srv://cyber4s-pokemon:${encodeURIComponent(
	"pokemon"
)}@cluster.oiwap.mongodb.net/?retryWrites=true&w=majority`;

let spriteURL = "https://raw.githubusercontent.com/Aegide/autogen-fusion-sprites/master/Battlers/%id1/%id1.%id2.png";
async function main() {
	const client = new MongoClient(url);
	client.connect(async (err: any) => {
		let moves = client.db("pokedex").collection("moves");
		let files = await fs.readdir("../src/api/moves");
		for (const file of files) {
			let move = await require("../src/api/moves/" + file);
			move = {
				accuracy: move["accuracy"],
				power: move["power"],
				pp: move["pp"],
				priority: move["priority"],
				type: move["type"],
				id: move["id"],
				name: move["name"],
				learned_by_pokemon: move["learned_by_pokemon"].map((pokemon) => ({
					name: pokemon.name,
				})),
			};

			moves.insertOne(move);
		}
	});
}

main();
