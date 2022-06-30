import { PokemonData } from "../shared/globals";
import { AbilityComponent } from "./AbilityComponent";

const layoutTemplate = `<div class="pokemon-comp" id="pokemon-%name">
<img class="pokemon-img" src="%sprite">
<div id="pokemon-basics">
<div>Height: %height</div>
<div>Weight: %weight</div>
<div>Type: %type</div
</div>
<div class="pokemon-cont">
  <img class="pokeball-img" src="./pokeball-open.png"/></a>
  <div class="pokemon-name">%name</div>
  </div>
  <div id="abilities"></div>
</div>`;

export class PokemonCopmonent {
	parent: HTMLElement;
	data: PokemonData;
	isCaugth: boolean;

	constructor(parent: HTMLElement, data: PokemonData) {
		this.parent = parent;
		this.data = data;
		const bag = localStorage.getItem("bag")!.split(",");

		this.isCaugth = bag.includes(this.data.name);
	}

	render() {
		let cardLayout = layoutTemplate;
		cardLayout = cardLayout.replace(/%name/g, this.data.name);
		cardLayout = cardLayout.replace(/%sprite/g, this.data.sprites.front_default);
		cardLayout = cardLayout.replace(/%height/g, this.data.height.toString());
		cardLayout = cardLayout.replace(/%weight/g, this.data.weight.toString());
		cardLayout = cardLayout.replace(/%type/g, this.data.types[0].type.name);

		this.parent.innerHTML = cardLayout;
		let img = this.parent.getElementsByClassName("pokeball-img")[0] as HTMLImageElement;
		img.addEventListener("click", () => this.catch());
		img.src = !this.isCaugth ? "./pokeball-open.png" : "./pokeball-closed.png";

		let abilityParent = document.getElementById("abilities")!;
		for (let i = 0; i < this.data.abilities.length; i++) {
			let ability = new AbilityComponent(abilityParent, this.data.abilities[i]);
			ability.render();
		}
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
