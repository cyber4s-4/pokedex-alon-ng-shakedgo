import { AbilityData } from "src/shared/globals";

export class AbilityComponent {
	parent: HTMLElement;
	data: AbilityData;

	constructor(parnet: HTMLElement, data: AbilityData) {
		this.parent = parnet;
		this.data = data;
	}
}
