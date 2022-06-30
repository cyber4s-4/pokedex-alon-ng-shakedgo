import { PokemonData } from "../shared/globals";

const cardTemplate = `<div class="pokemon-comp" id="pokemon-%name">
<img class="pokemon-img" src="%sprite">
  <div class="pokemon-name">%name</div>
  <div class="pokemon-functions">
  <img class="pokeball-img" onclick="pokemon.module.catch()" src="https://images.cults3d.com/gNmCucguF_950khaXUHO3dVUZLM=/516x516/https://files.cults3d.com/uploaders/19933232/illustration-file/58d154fb-ebc1-4f8b-bd76-a53f7c5c1ef5/2022_01_17_00_12_48_Pok%C3%A9ball_normal.pdf_et_1_page_suppl%C3%A9mentaire_Personnel_Microsoft_Edge.png" width="40px"/></a>
  <a class="pokemon-abilities" href=''>Abilities</a>
  </div>
</div>`;

export class PokemonCopmonent {
	parent: HTMLElement;
	data: PokemonData;

	constructor(parent: HTMLElement, data: PokemonData) {
		this.parent = parent;
		this.data = data;
	}

	render() {
		let cardLayout = cardTemplate;
		cardLayout = cardLayout.replace(/%name/g, this.data.name);
		cardLayout = cardLayout.replace(/%sprite/g, this.data.sprites.front_default);
		this.parent.innerHTML = cardLayout;
	}
}
