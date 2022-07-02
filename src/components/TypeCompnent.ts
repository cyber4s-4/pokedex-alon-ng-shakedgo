import { Pointer, TypeData } from "../shared/globals";

const layoutTemplate = `<a href="/type.html?type=%id" class="pokemon-type pokemon-type-%typeLowerCase">%type</a>`;
const pageLayoutTemplate = `<div class="comp" id="type-%name">
<div class="header">
	<h2 class="name type-name">%name</h2>
</div>

<table id="damage-relations" class="damage-relations">
	<tr id="double-damage-from" class="double-damage-from">
		<td class="damage-relations-label">Double Damage From</td>
		<td class="damage-relations-types"></td>
	</tr>
	<tr id="double-damage-to" class="double-damage-to">
		<td class="damage-relations-label">Double Damage To</td>
		<td class="damage-relations-types"></td>
	</tr>
	<tr id="half-damage-from" class="half-damage-from">
		<td class="damage-relations-label">Half Damage From</td>
		<td class="damage-relations-types"></td>
	</tr>
	<tr id="half-damage-to" class="half-damage-to">
		<td class="damage-relations-label">Half Damage To</td>
		<td class="damage-relations-types"></td>
	</tr>
	<tr id="no-damage-from" class="no-damage-from">
		<td class="damage-relations-label">No Damage From</td>
		<td class="damage-relations-types"></td>
	</tr>
	<tr id="no-damage-to" class="no-damage-to">
		<td class="damage-relations-label">No Damage To</td>
		<td class="damage-relations-types"></td>
	</tr>
</table>
</div>`;

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
	}

	renderDamageRelationTypes(damageRelation: string, data: TypeData) {
		let parent = document
			.getElementById(damageRelation.replace(/_/g, "-"))!
			.getElementsByClassName("damage-relations-types")[0];
		for (let type of data.damage_relations[damageRelation]) {
			new TypeComponent(parent as HTMLElement, type).render();
		}
	}
}
