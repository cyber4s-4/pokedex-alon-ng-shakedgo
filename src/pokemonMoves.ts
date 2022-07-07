import { MoveComponent } from "./components/MoveComponent";
import { NavbarComponent } from "./components/NavbarComponent";
import { checkForBag, MoveData } from "./shared/globals";

checkForBag();

class Module {
	onLoad() {
		let navbar = new NavbarComponent(document.getElementsByTagName("body")[0]);
		navbar.render();

		const searchParams = new URLSearchParams(location.search.slice(1));
		if (searchParams.has("move")) {
			fetch(`https://localhost:4000/api/move/${searchParams.get("move")}/`)
				.then((res) => res.json())
				.then((json) => this.renderPage(json));
		}
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
