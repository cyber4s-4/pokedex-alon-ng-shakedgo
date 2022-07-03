import { Pointer, TypeData } from "../shared/globals";
import { PokemonCopmonent } from "./PokemonCopmonent";

const layoutTemplate = `<a href="/type.html?type=%id" class="pokemon-type pokemon-type-%typeLowerCase">%type</a>`;
const pageLayoutTemplate = `<div class="comp" id="type-%name">
<div class="header">
	<h2 class="name type-name capitalize">%name</h2>
</div>

<table id="damage-relations" class="damage-relations"></table>
<h2>Pokemons of this type</h2>
<ul class="pokemon-list" id="pokemons-of-type"></ul>
</div>`;
const damageRelationRowTemplate = `<tr id="%attributes" class="%attributes">
<td class="damage-relations-label capitalize">%label</td>
<td class="damage-relations-types"></td>
</tr>`;

export class TypeComponent {
	parent: HTMLElement;
	data: Pointer | TypeData;

	constructor(parent: HTMLElement, data: Pointer | TypeData) {
		this.parent = parent;
		this.data = data;
	}

	render() {
		this.data = this.data as Pointer;
		let typeLayout = layoutTemplate.replace(/%typeLowerCase/g, this.data.name);
		typeLayout = typeLayout.replace(/%id/g, this.data.url.split("/")[6]);
		this.parent.innerHTML += typeLayout.replace(/%type/g, this.data.name[0].toUpperCase() + this.data.name.slice(1));
	}

	renderAsPage() {
		let pageLayout = pageLayoutTemplate;
		this.data = this.data as TypeData;
		pageLayout = pageLayout.replace(/%name/g, this.data.name);
		this.parent.innerHTML += pageLayout;

		this.renderDamageRelationTypes("double_damage_from", this.data);
		this.renderDamageRelationTypes("double_damage_to", this.data);
		this.renderDamageRelationTypes("half_damage_from", this.data);
		this.renderDamageRelationTypes("half_damage_to", this.data);
		this.renderDamageRelationTypes("no_damage_from", this.data);
		this.renderDamageRelationTypes("no_damage_to", this.data);

		const pokemonList = document.getElementById("pokemons-of-type")!;
		for (const pokemon of this.data.pokemon) {
			let pokemonListing = PokemonCopmonent.createPokemonListing(pokemon.pokemon);
			pokemonList.appendChild(pokemonListing);
		}
	}

	renderDamageRelationTypes(damageRelation: string, data: TypeData) {
		let damageRelationRow = damageRelationRowTemplate;
		damageRelationRow = damageRelationRow.replace(/%attributes/g, damageRelation.replace(/_/g, "-"));
		damageRelationRow = damageRelationRow.replace(/%label/g, damageRelation.replace(/_/g, " "));
		document.getElementById("damage-relations")!.innerHTML += damageRelationRow;

		let parent = document
			.getElementById(damageRelation.replace(/_/g, "-"))!
			.getElementsByClassName("damage-relations-types")[0];
		for (let type of data.damage_relations[damageRelation]) {
			new TypeComponent(parent as HTMLElement, type).render();
		}
	}
}
