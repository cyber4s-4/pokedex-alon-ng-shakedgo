import { PokemonData } from "../shared/globals";

const layoutTemplate = `<div class="pokemon-comp" id="pokemon-%name">
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
		const bag = localStorage.getItem("bag")!.split(",");
		console.log(bag.includes(this.data.name));

		this.isCaugth = bag.includes(this.data.name);
	}

	render() {
		let cardLayout = layoutTemplate;
		cardLayout = cardLayout.replace(/%name/g, this.data.name);
		cardLayout = cardLayout.replace(/%sprite/g, this.data.sprites.front_default);
		this.parent.innerHTML = cardLayout;
		let img = this.parent.getElementsByClassName("pokeball-img")[0] as HTMLImageElement;
		img.addEventListener("click", () => this.catch());
		img.src = !this.isCaugth ? "./pokeball-open.png" : "./pokeball-closed.png";
	}

	// Catch Pokemons - add to localStorage.
	catch() {
		this.isCaugth = !this.isCaugth;
		let img = this.parent.getElementsByClassName("pokeball-img")[0] as HTMLImageElement;
		img.src = !this.isCaugth ? "./pokeball-open.png" : "./pokeball-closed.png";

		let bag = localStorage.getItem("bag")!.split(",");
		if (this.isCaugth) {
			bag[0] === "" ? (bag[0] = this.data.name) : bag.push(this.data.name);
		} else {
			bag.splice(bag.indexOf(this.data.name), 1);
		}
		localStorage.setItem("bag", bag.join(","));
	}
}
