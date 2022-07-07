import { Request, Response } from "express";
import { json } from "body-parser";
const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(json());

app.get("/", (req: Request, res: Response) => {
	res.sendFile(path.join(__dirname, "../index.html"));
});

// app.get("/styles.css", (req: Request, res: Response) => {
// 	res.sendFile(path.join(__dirname, "../styles.css"));
// });

// app.get("/apps.js", (req: Request, res: Response) => {
// 	res.sendFile(path.join(__dirname, "../styles.css"));
// });

app.get("/api/pokemon/:pokemon", (req: Request, res: Response) => {
	let pokemon = req.params.pokemon;
	const filePath: string = path.join(__dirname, `/api/pokemon/${pokemon}.json`);
	res.send(JSON.stringify(fs.readFileSync(filePath, "utf8")));
});

app.listen(4000);
