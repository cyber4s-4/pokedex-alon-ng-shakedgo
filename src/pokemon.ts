import { NavbarComponent } from "./components/NavbarComponent";
import { PokemonComponent } from "./components/PokemonCopmonent";
import { checkForBag, PokemonData } from "./shared/globals";

checkForBag();

export class Pokemon {
	async onLoad() {
		let navbar = new NavbarComponent(document.getElementsByTagName("body")[0]);
		navbar.render();

		let pathnameSplit = location.pathname.split("/");
		const pokemonName = pathnameSplit[pathnameSplit.length - 1];
		let res = await fetch("http://localhost:4000/api/pokemon/" + pokemonName);
		this.renderPage(JSON.parse(await res.json()));
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
