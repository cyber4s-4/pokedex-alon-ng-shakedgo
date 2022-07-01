import { Pokemon } from "src/pokemon";
import { PokemonData } from "src/shared/globals";

const layoutTemplate = `
<div class="pokemon-comp" id="pokemon-%name">
    <img class="pokemon-img" src="%sprite">
    <div class="pokemon-cont">
        <img class="pokeball-img" src="./pokeball-open.png"/></a>
        <div class="pokemon-name">%name</div>
    </div>
</div>`;

// TODO: impement in <div id="bag"></div> from Index.html
// Refactor :(
export class BagComponent {
	parent: HTMLElement;
	pokemonData!: PokemonData;

	constructor(parent: HTMLElement) {
		this.parent = parent;
	}

	render() {
		let bag = localStorage.getItem("bag")!.split(",");
		console.log(bag);

		// get data of each pokemon and add cardLayout to parent
		for (let i = 0; i < bag.length; i++) {
			let cardLayout = layoutTemplate;
			let data = fetch("https://pokeapi.co/api/v2/pokemon/" + bag[i])
				.then((res) => res.json())
				.then((json) => (this.pokemonData = json as PokemonData))
				.then((res) => {
					let pokemon1 = new Pokemon(); // TODO: refactor pokemon render;
					pokemon1.renderPokemon(res, document.getElementById("bag")!);
					// cardLayout = cardLayout.replace(/%name/g, this.data.name);
					// cardLayout = cardLayout.replace(/%sprite/g, this.data.sprites.front_default);
					this.parent.innerHTML += cardLayout;
				});
		}
	}
}
