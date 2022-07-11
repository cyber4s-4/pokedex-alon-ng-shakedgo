import { Pointer, pokeballImages, PokemonData, StatData } from "../shared/globals";
import { AbilityComponent } from "./AbilityComponent";
import { StatsComponent } from "./StatsComponent";
import { TypeComponent } from "./TypeCompnent";

const layoutTemplate = `<div class="comp" id="pokemon-%name">
<div class="header">
	<img
		class="pokemon-img"
		src="%sprite"
	/>
	<h2 class="name">%name</h2>
</div>

<div id="basics" class="basics">
	<div id="stats" class="stats">
		<h2>Stats</h2>
		<div class="stats-container" id="stats-container"></div>
	</div>

	<div class="field-container" id="height">
		<span class="field-label capitalize">Height: </span><span class="field-value">%height ft. (%cm cm)</span>
	</div>
	<div class="field-container" id="weight">
		<span class="field-label capitalize">Weight: </span><span class="field-value">%weight kg</span>
	</div>
	<div class="pokemon-types-container" id="pokemon-types-container">
		<span class="field-label capitalize">Types:</span>
		<span class="pokemon-types" id="pokemon-types"></span>
	</div>

	<div id="pokemon-abilities" class="pokemon-abilities">
		<h3>Abilities</h3>
	</div>

	<div class="pokemon-catch">
		<h4>Catch this pokemon to add it to your bag!</h4>
		<img class="pokeball-img" src="./pokeball-closed.png" />
	</div>
</div>
</div>`;

const cardLayoutTemplate = `<div class="pokemon-card" id="pokemon-%name">
	<h3 class="pokemon-name capitalize">%name-formatted</h3>
	<img class="pokemon-img" src="%sprite">
	<div id="basics">
		<div id="stats" class="stats">
			<div class="stats-container" id="stats-container"></div>
		</div>
		<div class="field-container" id="height">
		<span class="field-label capitalize">Height: </span><span class="field-value">%height ft. (%cm cm)</span>
		</div>
		<div class="field-container" id="weight">
			<span class="field-label capitalize">Weight: </span><span class="field-value">%weight kg</span>
		</div>
		<div class="pokemon-types-container" id="pokemon-types-container">
			<span class="field-label capitalize">Types:</span>
			<span class="pokemon-types" id="pokemon-types"></span>
		</div>
	</div>
</div>`;

export class PokemonComponent {
	parent: HTMLElement;
	data: PokemonData;

	constructor(parent: HTMLElement, data: PokemonData) {
		this.parent = parent;
		this.data = data;
	}

	async render() {
		let pokemonLayout = layoutTemplate;

		pokemonLayout = pokemonLayout.replace(/%name/g, this.data.name.replace(/-/g, " "));
		pokemonLayout = pokemonLayout.replace(/%sprite/g, this.data.sprites.front_default);
		pokemonLayout = pokemonLayout.replace(/%height/g, this.data.height.toString());
		pokemonLayout = pokemonLayout.replace(/%cm/g, (this.data.height * 30.48).toString());
		pokemonLayout = pokemonLayout.replace(/%weight/g, this.data.weight.toString());

		pokemonLayout = pokemonLayout.replace(/%type/g, this.data.types[0]!.type.name); // TODO: ??

		this.parent.innerHTML = pokemonLayout;
		let img = this.parent.getElementsByClassName("pokeball-img")[0] as HTMLImageElement;
		img.addEventListener("click", () => this.catch());
		const isCaugth = await this.isCaught();

		img.src = !isCaugth ? pokeballImages.open : pokeballImages.closed;

		let statsContainer = document.getElementById("stats-container")!;
		let statsData: StatData[] = this.data.stats.map((stat) => ({
			name: stat.stat.name,
			value: stat.base_stat,
		}));
		let stats = new StatsComponent(statsContainer, statsData);
		stats.render();

		let abilitiesContainer = document.getElementById("pokemon-abilities")!;
		for (const abilityData of this.data.abilities) {
			let ability = new AbilityComponent(abilitiesContainer, abilityData);
			ability.render();
		}

		let typesContainer = document.getElementById("pokemon-types")!;
		for (const typeData of this.data.types) {
			let type = new TypeComponent(typesContainer, typeData.type);
			type.render();
		}
	}

	renderAsCard() {
		let cardLayout = cardLayoutTemplate;
		cardLayout = cardLayout.replace(/%name-formatted/g, this.data.name.replace(/-/g, " "));
		cardLayout = cardLayout.replace(/%name/g, this.data.name);
		cardLayout = cardLayout.replace(/%sprite/g, this.data.sprites.front_default);
		cardLayout = cardLayout.replace(/%height/g, this.data.height.toString());
		cardLayout = cardLayout.replace(/%cm/g, (this.data.height * 30.48).toString());
		cardLayout = cardLayout.replace(/%weight/g, this.data.weight.toString());
		this.parent.innerHTML += cardLayout;

		let pokemonCardDiv = document.getElementById(`pokemon-${this.data.name}`)!;
		let statsContainer = pokemonCardDiv.getElementsByClassName("stats-container")[0] as HTMLElement;
		let statsData: StatData[] = this.data.stats.map((stat) => ({
			name: stat.stat.name,
			value: stat.base_stat,
		}));

		let stats = new StatsComponent(statsContainer, statsData);
		stats.render();

		let cardElement = document.getElementById(`pokemon-${this.data.name}`)!;
		let typesContainer = cardElement.getElementsByClassName("pokemon-types")[0] as HTMLElement;
		for (const typeData of this.data.types) {
			let type = new TypeComponent(typesContainer, typeData.type);
			type.render();
		}
	}

	// Catch Pokemons - add to localStorage.
	async catch() {
		const isCaugth = await this.isCaught();
		let img = this.parent.getElementsByClassName("pokeball-img")[0] as HTMLImageElement;
		img.src = isCaugth ? pokeballImages.open : pokeballImages.closed;
		let body: { [_: string]: PokemonData } = {};
		body[this.data.name] = this.data;

		if (!isCaugth) {
			fetch("http://localhost:4000/bag/add", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(body),
			});
		} else {
			fetch("http://localhost:4000/bag/remove", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(body),
			});
		}
	}

	async isCaught(): Promise<boolean> {
		return (await fetch("http://localhost:4000/bag/get").then((res) => res.json()))[this.data.name] ? true : false;
	}

	static createPokemonListing(data: Pointer): HTMLElement {
		let pokemonListing = document.createElement("li");
		let pokemonLink = document.createElement("a");
		pokemonLink.href = data.url;
		pokemonLink.innerHTML = data.name.replace(/-/g, " ");
		pokemonLink.className = "capitalize";
		pokemonListing.appendChild(pokemonLink);
		return pokemonListing;
	}
}
