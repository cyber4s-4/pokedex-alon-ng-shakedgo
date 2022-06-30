import { AbilityData } from "src/shared/globals";

const layoutTemplate = `<div class="ability-%name">Ability Name: %name</div>
<div class="ability-%status">Visibility: %status</div>	
`;

export class AbilityComponent {
	parent: HTMLElement;
	data: AbilityData;

	constructor(parnet: HTMLElement, data: AbilityData) {
		this.parent = parnet;
		this.data = data;
	}

	render() {
		let father = document.createElement("div");
		father.setAttribute("id", "abilityParent");

		let abilityLayout = layoutTemplate;
		abilityLayout = abilityLayout.replace(/%name/g, this.data.ability.name);
		let abilityStatus = this.data.is_hidden ? "Hidden" : "Visible";
		abilityLayout = abilityLayout.replace(/%status/g, abilityStatus);
		father.innerHTML = abilityLayout;
		this.parent.appendChild(father);
	}
}
