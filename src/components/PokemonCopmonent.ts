import { PokemonData } from "../shared/globals";

const cardTemplate = `<div class="pokemon-comp" id="pokemon-%name">
<img class="pokemon-img" src="%sprite">
  <div class="pokemon-name">%name</div>
  <div class="pokemon-functions">
  <img class="pokeball-img" src="./pokeball-open.png" width="40px"/></a>
  <a class="pokemon-abilities" href=''>Abilities</a>
  </div>
</div>`;

export class PokemonCopmonent {
	parent: HTMLElement;
	data: PokemonData;
	isCaugth: boolean;
	constructor(parent: HTMLElement, data: PokemonData) {
		this.parent = parent;
		this.data = data;
		this.isCaugth = false;
	}

	render() {
		let cardLayout = cardTemplate;
		cardLayout = cardLayout.replace(/%name/g, this.data.name);
		cardLayout = cardLayout.replace(/%sprite/g, this.data.sprites.front_default);
		this.parent.innerHTML = cardLayout;
		this.parent.getElementsByClassName("pokeball-img")[0].addEventListener("click", () => this.catch());
	}

	// Catch Pokemons - add to localStorage.
	catch() {
		console.log("test");
		this.isCaugth = !this.isCaugth;
		let img = this.parent.getElementsByClassName("pokeball-img")[0] as HTMLImageElement;
		img.src = !this.isCaugth ? "./pokeball-open.png" : "./pokeball-closed.png";

		if (this.isCaugth) {
			let bag = localStorage.getItem("bag")!.split(",");
			if (bag[0] === "") {
				bag[0] = this.data.name;
			} else {
				bag.push("check");
			}
			localStorage.setItem("bag", bag.join(","));
		}
	}
}
