const fs = require("fs/promises");
const MongoClient = require("mongodb").MongoClient;

interface Pointer {
	name: string;
	url: string;
}

interface PokemonData {
	abilities: {}[];
	height: number;
	id: number;
	is_default: boolean;
	moves: { move: Pointer }[];
	name: string;
	sprites: { front_default: string };
	stats: { base_stat: number; effort: number; stat: Pointer }[];
	types: { type: Pointer }[];
	weight: number;
	parents?: [Pointer, Pointer];
}

const url = `mongodb+srv://cyber4s-pokemon:${encodeURIComponent(
	"pokemon"
)}@cluster.oiwap.mongodb.net/?retryWrites=true&w=majority`;

let idCounter = 421;
let spriteURL = "https://raw.githubusercontent.com/Aegide/autogen-fusion-sprites/master/Battlers/%id1/%id1.%id2.png";
async function main() {
	const client = new MongoClient(url);
	client.connect(async (err: any) => {
		let pokemons = client.db("pokedex").collection("pokemons");
		let pokemonsTemp: PokemonData[] = [];
		let files = await fs.readdir("./temp_pokemons");
		for (const file1 of files) {
			const pokemon1: PokemonData = await require("./temp_pokemons/" + file1);
			for (const file2 of files) {
				const pokemon2: PokemonData = await require("./temp_pokemons/" + file2);
				let id1 = pokemonData[pokemon1.id].fusionId;
				let id2 = pokemonData[pokemon2.id].fusionId;

				const fusedPokemon: PokemonData = {
					abilities: getRandomCollection(pokemon1, pokemon2, "abilities"),
					height: getRandomInRange(
						Math.min(pokemon1.height, pokemon2.height),
						Math.max(pokemon1.height, pokemon2.height)
					),
					id: idCounter++,
					is_default: false,
					moves: getRandomCollection(pokemon1, pokemon2, "moves"),
					name:
						pokemon1.name.slice(0, pokemon1.name.length / 2) +
						pokemon2.name.slice(pokemon2.name.length / 2, pokemon2.name.length),
					sprites: { front_default: spriteURL.replace(/%id1/g, id1).replace(/%id2/g, id2) },
					stats: getRandomStats(pokemon1, pokemon2),
					types: getRandomCollection(pokemon1, pokemon2, "types"),
					weight: getRandomInRange(
						Math.min(pokemon1.weight, pokemon2.weight),
						Math.max(pokemon1.weight, pokemon2.weight)
					),
					parents: [
						{ name: pokemon1.name, url: `/pokemon/${pokemon1.name}` },
						{ name: pokemon2.name, url: `/pokemon/${pokemon2.name}` },
					],
				};
				pokemonsTemp.push(fusedPokemon);
				if (idCounter % 100 === 0) {
					await pokemons.insertMany(pokemonsTemp);
					pokemonsTemp = [];
				}
			}
		}
	});
}

function getRandomInRange(min: number, max: number): number {
	return Math.floor(Math.random() * (max - min)) + min;
}

function getRandomCollection(pokemon1: PokemonData, pokemon2: PokemonData, collectionName: string) {
	let collection = pokemon1[collectionName]
		.concat(pokemon2[collectionName])
		.filter(() => Math.random() < (collectionName === "moves" ? 0.25 : 0.5));
	if (collection.length === 0) {
		collection.push(pokemon1[collectionName]);
	}
	return collection;
}

function getRandomStats(pokemon1: PokemonData, pokemon2: PokemonData) {
	let stats: { base_stat: number; effort: number; stat: Pointer }[] = [];
	for (let i = 0; i < pokemon1.stats.length; i++) {
		stats.push({
			base_stat: getRandomInRange(
				Math.min(pokemon1.stats[i].base_stat, pokemon2.stats[i].base_stat),
				Math.max(pokemon1.stats[i].base_stat, pokemon2.stats[i].base_stat)
			),
			effort: pokemon1.stats[i].effort,
			stat: pokemon1.stats[i].stat,
		});
	}
	return stats;
}

async function main2() {
	const client = new MongoClient(url);
	client.connect(async (err: any) => {
		let pokemons = client.db("pokedex").collection("pokemons");
		let files = await fs.readdir("./pokemons");
		for (const file1 of files) {
			const pokemon1: PokemonData = await require("./pokemons/" + file1);
			await pokemons.insertOne(pokemon1);
		}
	});
}

main2();
