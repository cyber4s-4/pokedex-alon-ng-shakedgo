import { PokemonCopmonent } from "./components/PokemonCopmonent";
import { checkForBag, PokemonData } from "./shared/globals";

checkForBag();

export class Pokemon {
	pokemonData!: PokemonData;

	onLoad() {
		const searchParams = new URLSearchParams(location.search.slice(1));

		if (searchParams.has("pokemon")) {
			fetch("https://pokeapi.co/api/v2/pokemon/" + searchParams.get("pokemon"))
				.then((res) => res.json())
				.then((json) => (this.pokemonData = json as PokemonData))
				.then((res) => {
					this.renderPokemon(res, document.getElementById("pokemons")!);
				});
		}
	}

	// Renders PokemonCopmonent.
	renderPokemon(data: PokemonData, parent: HTMLElement) {
		let pokemon = new PokemonCopmonent(parent, data);
		pokemon.render();
	}
}

export const pokemon = new Pokemon();

window.addEventListener("load", () => {
	pokemon.onLoad();
});
