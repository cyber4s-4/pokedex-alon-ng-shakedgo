import { PokemonData } from "src/shared/globals";
import { PokemonCopmonent } from "./PokemonCopmonent";

const layoutTemplate = `<div id="bag"></div>`;

export class BagComponent {
	parent: HTMLElement;
	pokemonData!: PokemonData;

	constructor(parent: HTMLElement) {
		this.parent = parent;
	}

	render() {
		let bag = JSON.parse(localStorage.getItem("bag")!);
		this.parent.innerHTML += layoutTemplate;

		// get data of each pokemon and add cardLayout to parent
		for (const pokemon in bag) {
			let pokemonCard = new PokemonCopmonent(document.getElementById("bag")!, bag[pokemon]);
			pokemonCard.renderAsCard();
		}
	}
}
