import { NavbarComponent } from "./components/NavbarComponent";
import { PokemonCopmonent } from "./components/PokemonCopmonent";
import { checkForBag, PokemonData } from "./shared/globals";

checkForBag();

export class Pokemon {
	onLoad() {
		let navbar = new NavbarComponent(document.getElementsByTagName("body")[0]);
		navbar.render();

		const searchParams = new URLSearchParams(location.search.slice(1));

		if (searchParams.has("pokemon")) {
			fetch("https://localhost:4000/api/pokemon/" + searchParams.get("pokemon"))
				.then((res) => res.json())
				.then((json) => this.renderPage(json));
		}
	}

	// Renders PokemonCopmonent.
	renderPage(data: PokemonData) {
		let pokemon = new PokemonCopmonent(document.getElementById("pokemons")!, data);
		pokemon.render();
	}
}

export const pokemon = new Pokemon();

window.addEventListener("load", () => {
	pokemon.onLoad();
});
