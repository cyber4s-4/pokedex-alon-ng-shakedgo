import { Collection, MongoClient } from "mongodb";
import { MoveData, PokemonData, TypeData } from "src/common/interfaces";
import { Client } from "pg";

const client = new Client({
	connectionString:
		"postgres://tbcbyqnfqcdbfb:3d99741f1aff53453fc6631709822af77a9640b9990ff547385acbc78ac06ee7@ec2-52-205-61-230.compute-1.amazonaws.com:5432/dc0q5rjh31ohvs",
	ssl: {
		rejectUnauthorized: false,
	},
});

export async function connectDB() {
	const uri = `mongodb+srv://cyber4s-pokemon:${encodeURIComponent(
		"pokemon"
	)}@cluster.oiwap.mongodb.net/?retryWrites=true&w=majority`;
	const client = new MongoClient(uri);
	await client.connect();
	let db = client.db("pokedex");
	return db;
}

let pokemonCollection: Collection<PokemonData>,
	movesCollection: Collection<MoveData>,
	typesCollection: Collection<TypeData>;
connectDB().then((db) => {
	pokemonCollection = db.collection("pokemons");
	movesCollection = db.collection("moves");
	typesCollection = db.collection("types");
});

export async function createTable(client: Client) {
	client.query("DROP TABLE IF EXISTS pokedex");
	let text = "CREATE TABLE pokedex (id SERIAL PRIMARY KEY,name VARCHAR(255) NOT NULL,height INTEGER,weight INTEGER);";
	client.query(text, (err) => {
		if (err) throw err;
	});
}

export async function insertTable(client: Client) {
	// let insert = "INSERT INTO pokedex (id,licenseDate ,name, height, weight) VALUES ";
	// let pokemonJson = pokemonCollection.find({}).toArray();
	// console.log(pokemonJson);
	// for (let i = 0; i < statements.length; i++) {
	// 	let rowVals = Object.values(statements[i]).slice(0, 6);
	// 	insert += `(${rowVals[0]},'${rowVals[1]}','${rowVals[2]}','${rowVals[3]}','${rowVals[4]}','${rowVals[5]}'),`;
	// }
	// insert = insert.slice(0, insert.length - 1) + ";";
	// client.query("select * from pokedex").catch();
}
createTable(client);
insertTable(client);
