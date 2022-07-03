import { MoveData, Pointer } from "src/shared/globals";

export class MoveComponent {
	parent: HTMLElement;
	data: MoveData;

	constructor(parent: HTMLElement, data: MoveData) {
		this.parent = parent;
		this.data = data;
	}

	renderAsPage() {
		
	}

	static createMoveListing(data: Pointer): HTMLElement {
		let moveListing = document.createElement("li");
		let moveLink = document.createElement("a");
		moveLink.href = `/move.html?move=${data.url.split("/")[6]}`;
		moveLink.innerHTML = data.name;
		moveLink.className = "capitalize";
		moveListing.appendChild(moveLink);
		return moveListing;
	}
}
