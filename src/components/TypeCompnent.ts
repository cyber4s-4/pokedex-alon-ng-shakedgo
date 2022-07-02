import { Pointer, TypeData } from "../shared/globals";

const layoutTemplate = `<span class="pokemon-type pokemon-type-%typeLowerCase">%type</span>`;
const pageLayoutTemplate = `<div class="comp" id="type-%name">
<div class="header">
	<h2 class="name type-name">%name</h2>
</div>

<div id="basics" class="basics">
	
</div>
</div>`;

export class TypeComponent {
	parent: HTMLElement;
	data: Pointer | TypeData;

	constructor(parent: HTMLElement, data: Pointer | TypeData) {
		this.parent = parent;
		this.data = data;
	}

	render() {
		let typeLayout = layoutTemplate.replace(/%typeLowerCase/g, this.data.name);
		this.parent.innerHTML += typeLayout.replace(/%type/g, this.data.name[0].toUpperCase() + this.data.name.slice(1));
	}

	renderAsPage() {
		let pageLayout = pageLayoutTemplate;
		this.data = this.data as TypeData;
		pageLayout = pageLayout.replace(/%name/g, this.data.name);
		this.parent.innerHTML += pageLayout;
	}
}
