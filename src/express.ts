import { Request, Response } from "express";
import { json } from "body-parser";
const express = require("express");
const fs = require("fs").promises;
const path = require("path");

const app = express();
app.use(json());
app.use(express.static(__dirname + "/"));

app.get("/pokemon/:pokemon", (req: Request, res: Response) => {
	res.sendFile(path.join(__dirname, "./pokemon.html"));
});

app.get("/type/:type", (req: Request, res: Response) => {
	res.sendFile(path.join(__dirname, "./type.html"));
});

app.get("/move/:move", (req: Request, res: Response) => {
	res.sendFile(path.join(__dirname, "./move.html"));
});

app.get("/api/pokemon", async (req: Request, res: Response) => {
	let results: { results: { name: string; url: string }[] } = { results: [] };
	let pokemonPath = path.join(__dirname, `../api/pokemons`);

	let files = await fs.readdir(pokemonPath);
	for (const file of files) {
		const filePath = path.join(pokemonPath, file);
		let data = await fs.readFile(filePath).then((res: any) => JSON.parse(res));

		results.results.push({ name: data.name, url: `http://localhost:4000/api/pokemon/${data.name}` });
	}
	res.json(results);
});

app.get("/api/pokemon/:pokemon", (req: Request, res: Response) => {
	let pokemon = req.params.pokemon;
	const filePath: string = path.join(__dirname, `../api/pokemons/${pokemon}.json`);
	fs.readFile(filePath, "utf8").then((data: {}) => res.json(data));
});

app.get("/api/type", async (req: Request, res: Response) => {
	let results: { results: { name: string; url: string }[] } = { results: [] };
	let typePath = path.join(__dirname, `../api/types`);

	let files = await fs.readdir(typePath);
	for (const file of files) {
		const filePath = path.join(typePath, file);
		let data = await fs.readFile(filePath).then((res: any) => JSON.parse(res));

		results.results.push({ name: data.name, url: `http://localhost:4000/api/move/${data.name}` });
	}
	res.json(results);
});

app.get("/api/type/:type", (req: Request, res: Response) => {
	let type = req.params.type;
	const filePath: string = path.join(__dirname, `../api/types/${type}.json`);
	fs.readFile(filePath, "utf8").then((data: {}) => res.json(data));
});

app.get("/api/move", async (req: Request, res: Response) => {
	let results: { results: { name: string; url: string }[] } = { results: [] };
	let movePath = path.join(__dirname, `../api/moves`);

	let files = await fs.readdir(movePath);
	for (const file of files) {
		const filePath = path.join(movePath, file);
		let data = await fs.readFile(filePath).then((res: any) => JSON.parse(res));

		results.results.push({ name: data.name, url: `http://localhost:4000/api/move/${data.name}` });
	}
	res.json(results);
});

app.get("/api/move/:move", (req: Request, res: Response) => {
	let move = req.params.move;
	const filePath: string = path.join(__dirname, `../api/moves/${move}.json`);
	fs.readFile(filePath, "utf8").then((data: {}) => res.json(data));
});

app.listen(4000);
