import { Client } from "pg";
import { insertPokemonFusion } from "./fusion";

const client = process.env.DATABASE_URL
	? new Client({
			connectionString: process.env.DATABASE_URL,
			ssl: {
				rejectUnauthorized: false,
			},
	  })
	: new Client({
			host: "localhost",
			user: "postgres",
			port: 5432,
			password: "rootUser",
			database: "postgres",
	  });

export async function connect() {
	client.connect();
	return client;
}

export async function createTable(client: Client) {
	await client.query("DROP TABLE IF EXISTS pokemons");
	let text = `CREATE TABLE pokemons 
	(id INTEGER PRIMARY KEY,
		name VARCHAR(255) NOT NULL,
		height INTEGER,
		weight INTEGER, 
		sprite VARCHAR(255) NOT NULL,
		hp INTEGER,
		attack INTEGER,
		defense INTEGER,
		specialAttack INTEGER,
		specialDefense INTEGER,
		speed INTEGER,
		types TEXT[]);`;
	return client.query(text);
}

export async function insertTable(client: Client) {
	// Randomly insert around 7000 fused pokemons to the database.
	insertPokemonFusion(client);
}

export async function getPokemons(client: Client, searchTerm: string) {
	const sql = "SELECT name FROM pokemons WHERE name LIKE $1;";
	return (await client.query(sql, [searchTerm + "%"])).rows.map((p) => p.name);
}

export async function getPokemon(client: Client, name: string) {
	const sql = "SELECT * FROM pokemons WHERE name=$1;";
	return (await client.query(sql, [name])).rows[0];
}

insertTable(client);
