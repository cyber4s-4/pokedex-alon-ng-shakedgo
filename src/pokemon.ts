import { PokemonCopmonent } from "./PokemonCopmonent";
import { PokemonData } from "./shared/globals";

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

	renderPokemon(data: PokemonData) {
		let parent = document.getElementById("pokemons")!;
		let pokemon = new PokemonCopmonent(parent, data);
		console.log(pokemon);
		pokemon.render();
	}
}

export const module = new Module();

window.addEventListener("load", () => {
	module.onLoad();
});
