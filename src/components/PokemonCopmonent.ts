import { PokemonData } from "../shared/globals";
import { AbilityComponent } from "./AbilityComponent";
import { TypeComponent } from "./TypeCompnent";

const layoutTemplate = `<div class="pokemon-comp" id="pokemon-%name">
<div class="pokemon-header">
	<img
		class="pokemon-img"
		src="%sprite"
	/>
	<h2 class="pokemon-name">%name</h2>
</div>

<div id="pokemon-basics" class="pokemon-basics">
	<div class="field-container" id="height">
		<span class="field-label">Height: </span><span class="field-value">%height ft. (%cm cm)</span>
	</div>
	<div class="field-container" id="weight">
		<span class="field-label">Weight: </span><span class="field-value">%weight kg</span>
	</div>
	<div class="pokemon-types-container" id="pokemon-types-container">
		<span class="field-label">Types:</span>
		<span class="pokemon-types" id="pokemon-types"></span>
	</div>

	<div id="pokemon-abilities" class="pokemon-abilities">
		<h3>Abilities</h3>
	</div>

	<div class="pokemon-catch">
		<img class="pokeball-img" src="./pokeball-closed.png" />
	</div>
</div>
</div>`;

const cardLayoutTemplate = `<div class="pokemon-card">
	<img class="pokemon-img" src="%sprite">
	<div id="pokemon-basics">
		<div>Height: %height</div>
		<div>Weight: %weight</div>
		<div>Type: %type</div>
	</div>
</div>`;

export class PokemonCopmonent {
	parent: HTMLElement;
	data: PokemonData;
	isCaugth: boolean;

	constructor(parent: HTMLElement, data: PokemonData) {
		this.parent = parent;
		this.data = data;
		const bag = JSON.parse(localStorage.getItem("bag")!);

		this.isCaugth = bag[this.data.name];
	}

	render() {
		let pokemonLayout = layoutTemplate;
		pokemonLayout = pokemonLayout.replace(/%name/g, this.data.name);
		pokemonLayout = pokemonLayout.replace(/%sprite/g, this.data.sprites.front_default);
		pokemonLayout = pokemonLayout.replace(/%height/g, this.data.height.toString());
		pokemonLayout = pokemonLayout.replace(/%cm/g, (this.data.height * 30.48).toString());
		pokemonLayout = pokemonLayout.replace(/%weight/g, this.data.weight.toString());

		pokemonLayout = pokemonLayout.replace(/%type/g, this.data.types[0]!.type.name); // TODO: ??

		this.parent.innerHTML = pokemonLayout;
		let img = this.parent.getElementsByClassName("pokeball-img")[0] as HTMLImageElement;
		img.addEventListener("click", () => this.catch());
		img.src = !this.isCaugth ? "./pokeball-open.png" : "./pokeball-closed.png";

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
		cardLayout = cardLayout.replace(/%name/g, this.data.name);
		cardLayout = cardLayout.replace(/%sprite/g, this.data.sprites.front_default);
		cardLayout = cardLayout.replace(/%height/g, this.data.height.toString());
		cardLayout = cardLayout.replace(/%weight/g, this.data.weight.toString());
		this.parent.innerHTML += cardLayout;
	}

	// Catch Pokemons - add to localStorage.
	catch() {
		this.isCaugth = !this.isCaugth;
		let img = this.parent.getElementsByClassName("pokeball-img")[0] as HTMLImageElement;
		img.src = !this.isCaugth ? "./pokeball-open.png" : "./pokeball-closed.png";

		let bag = JSON.parse(localStorage.getItem("bag")!);
		if (this.isCaugth) {
			bag[this.data.name] = this.data;
		} else {
			delete bag[this.data.name];
		}
		localStorage.setItem("bag", JSON.stringify(bag));
	}
}
