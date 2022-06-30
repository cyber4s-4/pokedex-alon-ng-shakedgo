import { PokemonCopmonent } from "./components/PokemonCopmonent";
import { checkForBag, PokemonData } from "./shared/globals";

checkForBag();

class Module {
	pokemonData!: PokemonData;

	onLoad() {
		const searchParams = new URLSearchParams(location.search.slice(1));

		if (searchParams.has("pokemon")) {
			fetch("https://pokeapi.co/api/v2/pokemon/" + searchParams.get("pokemon"))
				.then((res) => res.json())
				.then((json) => (this.pokemonData = json as PokemonData))
				.then((res) => {
					this.renderPokemon(res);
				});
		}
	}

	// Renders PokemonCopmonent.
	renderPokemon(data: PokemonData) {
		let parent = document.getElementById("pokemons")!;
		let pokemon = new PokemonCopmonent(parent, data);
		pokemon.render();
	}
}

export const module = new Module();

window.addEventListener("load", () => {
	module.onLoad();
});
