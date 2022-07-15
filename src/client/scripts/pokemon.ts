import { NavbarComponent } from "../../common/components/NavbarComponent";
import { PokemonComponent } from "../../common/components/PokemonCopmonent";
import { PokemonData } from "../../common/interfaces";
import { checkForBag } from "../../common/globals";

checkForBag();

export class Pokemon {
	async onLoad() {
		let navbar = new NavbarComponent(document.getElementsByTagName("body")[0]);
		navbar.render();

		let pathnameSplit = location.pathname.split("/");
		const pokemonName = pathnameSplit[pathnameSplit.length - 1];
		let res = await fetch("/api/pokemon/" + pokemonName);
		this.renderPage(await res.json());
	}

	// Renders PokemonCopmonent.
	renderPage(data: PokemonData) {
		let pokemon = new PokemonComponent(document.getElementById("pokemons")!, data);
		pokemon.render();
	}
}

export const pokemon = new Pokemon();

window.addEventListener("load", () => {
	pokemon.onLoad();
});
