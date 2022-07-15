import { Request, Response } from "express";
import { json } from "body-parser";
import express from "express";
import path from "path";
import { MoveData, PokemonData, TypeData } from "../common/interfaces";
import { Collection, MongoClient, WithId } from "mongodb";
const port = process.env.PORT || 4000;

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

const app = express();
app.use(json());
app.use(express.static(__dirname + "/../static"));

let bagContent: { [index: string]: PokemonData } = {};

app.post("/bag/remove/", (req: Request, res: Response) => {
	let name = Object.keys(req.body)[0];
	delete bagContent[name];
	res.json(bagContent);
});

app.post("/bag/add", (req: Request, res: Response) => {
	let name = Object.keys(req.body)[0];
	if (!bagContent[name]) {
		bagContent[name] = req.body[name];
	}
	res.json(bagContent);
});

// @ts-ignore
app.get("/bag/get", (req: Request, res: Response) => {
	res.json(bagContent);
});

// @ts-ignore
app.get("/pokemon/:pokemon", (req: Request, res: Response) => {
	res.sendFile(path.join(__dirname, "../static/pokemon.html"));
});

// @ts-ignore
app.get("/type/:type", (req: Request, res: Response) => {
	res.sendFile(path.join(__dirname, "../static/type.html"));
});

// @ts-ignore
app.get("/move/:move", (req: Request, res: Response) => {
	res.sendFile(path.join(__dirname, "../static/move.html"));
});

// @ts-ignore
app.get("/api/pokemon", async (req: Request, res: Response) => {
	const searchTerm = req.query["term"] as string;

	let pokemonSearch = await pokemonCollection
		.aggregate([
			{ $match: { name: { $regex: new RegExp("^" + searchTerm) } } },
			{ $project: { name: 1, _id: 0 } },
			{ $limit: 10 },
		])
		.toArray();
	let results = await pokemonSearch.map((pokemon) => ({
		name: pokemon.name,
		url: `/pokemon/${pokemon.name}`,
	}));
	res.json(results);
});

app.get("/api/pokemon/:pokemon", async (req: Request, res: Response) => {
	let pokemon = req.params.pokemon;
	pokemonCollection.findOne({ name: pokemon }).then((data: WithId<PokemonData> | null) => res.json(data));
});

// @ts-ignore
app.get("/api/type", async (req: Request, res: Response) => {
	const searchTerm = req.query["term"] as string;

	let typeSearch = await typesCollection
		.aggregate([
			{ $match: { name: { $regex: new RegExp("^" + searchTerm) } } },
			{ $project: { name: 1, _id: 0 } },
			{ $limit: 10 },
		])
		.toArray();
	let results = await typeSearch.map((type) => ({
		name: type.name,
		url: `/type/${type.name}`,
	}));
	res.json(results);
});

app.get("/api/type/:type", (req: Request, res: Response) => {
	let type = req.params.type;
	typesCollection.findOne({ name: type }).then((data: WithId<TypeData> | null) => res.json(data));
});

// @ts-ignore
app.get("/api/move", async (req: Request, res: Response) => {
	const searchTerm = req.query["term"] as string;

	let moveSearch = await movesCollection
		.aggregate([
			{ $match: { name: { $regex: new RegExp("^" + searchTerm) } } },
			{ $project: { name: 1, _id: 0 } },
			{ $limit: 10 },
		])
		.toArray();
	let results = await moveSearch.map((move) => ({
		name: move.name,
		url: `/move/${move.name}`,
	}));
	res.json(results);
});

app.get("/api/move/:move", (req: Request, res: Response) => {
	let move = req.params.move;
	movesCollection.findOne({ name: move }).then((data: WithId<MoveData> | null) => res.json(data));
});

app.listen(port, () => console.log(`Listening on port ${port}`));
