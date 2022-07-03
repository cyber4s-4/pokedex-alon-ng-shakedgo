const layoutTemplate = `<li id='%name' onclick='location.href=location.origin + "/%type.html?%type=%value"'>%name</li>`;

export class SearchResult {
	text: string;
	type: string;
	value: string;
	parent: HTMLElement;

	constructor(text: string, type: string, value: string, parent: HTMLElement) {
		this.text = text;
		this.type = type;
		this.value = value;
		this.parent = parent;
	}

	getLayout() {
		let resultLayout = layoutTemplate;

		resultLayout = resultLayout.replace(/%name/g, this.text);
		resultLayout = resultLayout.replace(/%type/g, this.type);
		resultLayout = resultLayout.replace(/%value/g, this.value);
		return resultLayout;
	}
}
