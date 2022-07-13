import { StatData } from "../interfaces";

const layoutTemplate = `<div class="stats-%name">
    <span class="field-label capitalize">%name: </span><span class="field-value">%value</span>
</div>`;

export class StatsComponent {
	parent: HTMLElement;
	data: StatData[];

	constructor(parent: HTMLElement, data: StatData[]) {
		this.parent = parent;
		this.data = data;
	}

	render() {
		for (const stat of this.data) {
			let statLayout = layoutTemplate;
			statLayout = statLayout.replace(/%name/g, stat.name);
			statLayout = statLayout.replace(/%value/g, stat.value.toString());
			this.parent.innerHTML += statLayout;
		}
	}
}
