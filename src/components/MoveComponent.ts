import { MoveData, Pointer, StatData } from "src/shared/globals";
import { PokemonComponent } from "./PokemonCopmonent";
import { StatsComponent } from "./StatsComponent";
import { TypeComponent } from "./TypeCompnent";

const pageLayoutTemplate = `<div class="comp" id="move-%name">
	<div class="header">
		<h2 class="name move-name capitalize">%name</h2>
	</div>

	<div id="stats" class="stats">
		<h2>Stats</h2>
		<div class="stats-container" id="stats-container"></div>
		<div class="pokemon-types-container" id="pokemon-types-container">
			<span class="field-label capitalize">Types:</span>
			<span class="pokemon-types" id="pokemon-types"></span>
		</div>
	</div>
	<h2 style="margin: 40px 0 0 0">Pokemons who can learn this move</h2>
	<ul class="pokemon-list" id="pokemons-of-type"></ul>
</div>`;

export class MoveComponent {
	parent: HTMLElement;
	data: MoveData;

	constructor(parent: HTMLElement, data: MoveData) {
		this.parent = parent;
		this.data = data;
	}

	renderAsPage() {
		let pageLayout = pageLayoutTemplate;
		pageLayout = pageLayout.replace(/%name/g, this.data.name.replace(/-/g, " "));
		this.parent.innerHTML += pageLayout;

		let statsData: StatData[] = [];
		if (this.data.power) statsData.push({ name: "power", value: this.data.power });
		if (this.data.accuracy) statsData.push({ name: "accuracy", value: this.data.accuracy });
		if (this.data.pp) statsData.push({ name: "PP", value: this.data.pp });
		if (this.data.priority) statsData.push({ name: "priority", value: this.data.priority });
		let stats = new StatsComponent(document.getElementById("stats-container")!, statsData);
		stats.render();

		let moveType = new TypeComponent(document.getElementById("pokemon-types")!, this.data.type);
		moveType.render();

		const pokemonsList = document.getElementById("pokemons-of-type")!;
		for (const pokemon of this.data.learned_by_pokemon) {
			pokemon.url = `http://localhost:4000/pokemon/${pokemon.name}`;
			let pokemonListing = PokemonComponent.createPokemonListing(pokemon);
			pokemonsList.appendChild(pokemonListing);
		}
	}

	static createMoveListing(data: Pointer): HTMLElement {
		let moveListing = document.createElement("li");
		let moveLink = document.createElement("a");
		moveLink.href = data.url;
		moveLink.innerHTML = data.name.replace(/-/g, " ");
		moveLink.className = "capitalize";
		moveListing.appendChild(moveLink);
		return moveListing;
	}
}
