import { PokemonCopmonent } from "./PokemonCopmonent";

const layoutTemplate = `<div id="bag" class="bag">
	<h2>Pokemon Bag</h2>
	<div id="bag-contents" class="bag-contents"></div>
</div>`;

export class BagComponent {
	parent: HTMLElement;

	constructor(parent: HTMLElement) {
		this.parent = parent;
	}

	render() {
		let bag = JSON.parse(localStorage.getItem("bag")!);
		this.parent.innerHTML += layoutTemplate;

		// get data of each pokemon and add cardLayout to parent
		for (const pokemon in bag) {
			let pokemonCard = new PokemonCopmonent(document.getElementById("bag-contents")!, bag[pokemon]);
			pokemonCard.renderAsCard();
		}
	}
}
