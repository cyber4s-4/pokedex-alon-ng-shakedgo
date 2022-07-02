import { NavbarComponent } from "./components/NavbarComponent";
import { TypeComponent } from "./components/TypeCompnent";
import { checkForBag, TypeData } from "./shared/globals";

checkForBag();

class Module {
	onLoad() {
		let navbar = new NavbarComponent(document.getElementsByTagName("body")[0]);
		navbar.render();

		const searchParams = new URLSearchParams(location.search.slice(1));
		if (searchParams.has("type")) {
			fetch(`https://pokeapi.co/api/v2/type/${searchParams.get("type")}/`)
				.then((res) => res.json())
				.then((json) => this.renderPage(json));
		}
	}

	renderPage(data: TypeData) {
		let pokemonType = new TypeComponent(document.getElementsByTagName("main")[0], data);
		pokemonType.renderAsPage();
	}
}
export const module = new Module();

window.addEventListener("load", () => {
	module.onLoad();
});
