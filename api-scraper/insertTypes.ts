const fs = require("fs/promises");
const MongoClient = require("mongodb").MongoClient;

const url = `mongodb+srv://cyber4s-pokemon:${encodeURIComponent(
	"pokemon"
)}@cluster.oiwap.mongodb.net/?retryWrites=true&w=majority`;

let spriteURL = "https://raw.githubusercontent.com/Aegide/autogen-fusion-sprites/master/Battlers/%id1/%id1.%id2.png";
async function main() {
	const client = new MongoClient(url);
	client.connect(async (err: any) => {
		let types = client.db("pokedex").collection("types");
		let files = await fs.readdir("../src/api/types");
		for (const file of files) {
			let type = await require("../src/api/types/" + file);
			type = {
				damage_relations: type["damage_relations"],
				id: type["id"],
				name: type["name"],
				moves: type["moves"].map((move) => ({ name: move.name })),
				pokemon: type["pokemon"],
			};
			types.insertOne(type);
		}
	});
}

main();
