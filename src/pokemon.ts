import { PokemonCopmonent } from "./components/PokemonCopmonent";
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

	// Renders PokemonCopmonent.
	renderPokemon(data: any) {
		let parent = document.getElementById("pokemons")!;
		let pokemon = new PokemonCopmonent(parent, data);
		pokemon.render();
	}

	// Catch Pokemons - add to localStorage.
	catch() {
		const searchParams = new URLSearchParams(location.search.slice(1));
		let name = searchParams.get("pokemon");
		localStorage.setItem(name!.toString(), name!.toString()); // TODO: Change [key,value]
	}
}

export const module = new Module();

window.addEventListener("load", () => {
	module.onLoad();
});
