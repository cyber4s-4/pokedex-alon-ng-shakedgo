import { PokemonData } from "./shared/globals";

class Module {
	pokemonData!: PokemonData;

	onLoad() {
		const searchParams = new URLSearchParams(location.search.slice(1));

		if (searchParams.has("pokemon")) {
			fetch("https://pokeapi.co/api/v2/pokemon/" + searchParams.get("pokemon"))
				.then((res) => res.json())
				.then((json) => (this.pokemonData = json as PokemonData))
				.then(console.log);
		}
	}
}

export const module = new Module();

window.addEventListener("load", () => {
	module.onLoad();
});
