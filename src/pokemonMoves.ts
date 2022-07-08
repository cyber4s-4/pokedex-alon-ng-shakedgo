import { MoveComponent } from "./components/MoveComponent";
import { NavbarComponent } from "./components/NavbarComponent";
import { checkForBag, MoveData } from "./shared/globals";

checkForBag();

class Module {
	async onLoad() {
		let navbar = new NavbarComponent(document.getElementsByTagName("body")[0]);
		navbar.render();

		let pathnameSplit = location.pathname.split("/");
		const pokemonMove = pathnameSplit[pathnameSplit.length - 1];
		let res = await fetch("http://localhost:4000/api/move/" + pokemonMove);
		this.renderPage(JSON.parse(await res.json()));
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
