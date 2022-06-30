const layoutTemplate = `<li id='%name' onclick='location.href=location.origin + "/pokemon.html?pokemon=%name"'>%name</li>`;

export class SearchResult {
	layout: string;
	parent: HTMLElement;

	constructor(text: string, parent: HTMLElement) {
		this.layout = layoutTemplate.replace(/%name/g, text);
		this.parent = parent;
	}

	render() {
		this.parent.innerHTML += this.layout;
	}
}
