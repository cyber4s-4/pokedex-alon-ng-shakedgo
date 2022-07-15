import { MoveComponent } from "../../common/components/MoveComponent";
import { NavbarComponent } from "../../common/components/NavbarComponent";
import { MoveData } from "../../common/interfaces";
import { checkForBag } from "../../common/globals";

checkForBag();

class Module {
	async onLoad() {
		let navbar = new NavbarComponent(document.getElementsByTagName("body")[0]);
		navbar.render();

		let pathnameSplit = location.pathname.split("/");
		const pokemonMove = pathnameSplit[pathnameSplit.length - 1];
		let res = await fetch("/api/move/" + pokemonMove);
		this.renderPage(await res.json());
	}

	renderPage(data: MoveData) {
		let pokemonMove = new MoveComponent(document.getElementsByTagName("main")[0], data);
		pokemonMove.renderAsPage();
	}
}
export const module = new Module();

window.addEventListener("load", () => {
	module.onLoad();
});
