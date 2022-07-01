import { MoveData } from "src/shared/globals";

export class MoveComponent {
	parent: HTMLElement;
	data: MoveData;

	constructor(parent: HTMLElement, data: MoveData) {
		this.parent = parent;
		this.data = data;
	}
}
