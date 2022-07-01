import { TypeData } from "../shared/globals";

const layoutTemplate = `<span class="pokemon-type pokemon-type-%typeLowerCase">%type</span>`;

export class TypeComponent {
	parent: HTMLElement;
	data: TypeData;

	constructor(parent: HTMLElement, data: TypeData) {
		this.parent = parent;
		this.data = data;
	}

	render() {
		let typeTemplate = layoutTemplate.replace(/%typeLowerCase/g, this.data.name);
		this.parent.innerHTML += typeTemplate.replace(/%type/g, this.data.name[0].toUpperCase() + this.data.name.slice(1));
	}
}
