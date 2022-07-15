import { NavbarComponent } from "../../common/components/NavbarComponent";
import { TypeComponent } from "../../common/components/TypeCompnent";
import { TypeData } from "../../common/interfaces";
import { checkForBag } from "../../common/globals";

checkForBag();

class Module {
	async onLoad() {
		let navbar = new NavbarComponent(document.getElementsByTagName("body")[0]);
		navbar.render();

		let pathnameSplit = location.pathname.split("/");
		const pokemonType = pathnameSplit[pathnameSplit.length - 1];
		let res = await fetch("/api/type/" + pokemonType);
		this.renderPage(await res.json());
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
