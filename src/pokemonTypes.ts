import { NavbarComponent } from "./components/NavbarComponent";
import { TypeComponent } from "./components/TypeCompnent";
import { checkForBag, TypeData } from "./shared/globals";

checkForBag();

class Module {
	async onLoad() {
		let navbar = new NavbarComponent(document.getElementsByTagName("body")[0]);
		navbar.render();

		let pathnameSplit = location.pathname.split("/");
		const pokemonType = pathnameSplit[pathnameSplit.length - 1];
		let res = await fetch("http://localhost:4000/api/type/" + pokemonType);
		this.renderPage(JSON.parse(await res.json()));
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
