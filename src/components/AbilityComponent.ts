import { AbilityData } from "src/shared/globals";

const layoutTemplate = `<div class="ability-container">
<div class="ability-%name">
	<span class="field-label">Ability Name: </span><span class="field-value">%name</span>
</div>
<div class="ability-%visibility">
	<span class="field-label">Visibility: </span><span class="field-value">%visibility</span>
</div>
</div>`;

export class AbilityComponent {
	parent: HTMLElement;
	data: AbilityData;

	constructor(parnet: HTMLElement, data: AbilityData) {
		this.parent = parnet;
		this.data = data;
	}

	render() {
		let abilityLayout = layoutTemplate;
		abilityLayout = abilityLayout.replace(/%name/g, this.data.ability.name);
		let abilityVisibility = this.data.is_hidden ? "Hidden" : "Visible";
		abilityLayout = abilityLayout.replace(/%visibility/g, abilityVisibility);
		abilityLayout = abilityLayout.replace(/%status-lower-case/g, abilityVisibility.toLowerCase());

		this.parent.innerHTML += abilityLayout;
	}
}
