import { PokemonComponent } from "./PokemonCopmonent";

const layoutTemplate = `<div id="bag" class="bag">
	<h2>Pokemon Bag</h2>
	<div id="bag-contents" class="bag-contents"></div>
</div>`;

export class BagComponent {
	parent: HTMLElement;

	constructor(parent: HTMLElement) {
		this.parent = parent;
	}

	async render() {
		let bag = await fetch("http://localhost:4000/bag/get").then((res) => res.json());
		this.parent.innerHTML += layoutTemplate;

		// get data of each pokemon and add cardLayout to parent
		for (const pokemon in bag) {
			let pokemonCard = new PokemonComponent(document.getElementById("bag-contents")!, bag[pokemon]);
			pokemonCard.renderAsCard();
		}

		if (Object.keys(bag).length === 0) {
			document.getElementById("bag-contents")!.innerHTML = "Catch pokemons to have them in your bag!";
		}
	}
}
