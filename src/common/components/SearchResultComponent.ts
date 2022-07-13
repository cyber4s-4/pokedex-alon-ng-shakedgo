const layoutTemplate = `<li id='%name' onclick='location.href = "%url"'>%name</li>`;

export class SearchResult {
	text: string;
	url: string;
	parent: HTMLElement;

	constructor(text: string, url: string, parent: HTMLElement) {
		this.text = text;
		this.url = url;
		this.parent = parent;
	}

	getLayout() {
		let resultLayout = layoutTemplate;

		resultLayout = resultLayout.replace(/%name/g, this.text);
		resultLayout = resultLayout.replace(/%url/g, this.url);
		return resultLayout;
	}
}
