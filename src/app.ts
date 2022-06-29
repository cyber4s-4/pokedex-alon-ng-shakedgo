import { searchResultTemplate } from "./shared/globals";

class Module {
	pokemonNames: Promise<string[]>;

	constructor() {
		this.pokemonNames = this.getPokemonNames();
	}

	async getPokemonNames(): Promise<string[]> {
		let allPokemons = await fetch("https://pokeapi.co/api/v2/pokemon?limit=1000000")
			.then((res) => res.json())
			.then((res) => res["results"]);
		return allPokemons.map((pokemon: { name: string }) => pokemon.name);
	}

	updateSearchResults() {
		let searchTerm = (document.getElementById("search") as HTMLInputElement).value.toLocaleLowerCase();
		let validPokemons = this.pokemonNames.then((pokemons) =>
			pokemons.filter((pokemon) => pokemon.startsWith(searchTerm))
		);

		let ulString = "";

		validPokemons.then((pokemons) => {
			if (searchTerm !== "") {
				pokemons.forEach((pokemon) => {
					let searchResultTemplateCopy = searchResultTemplate;
					ulString += searchResultTemplateCopy.replace(/%name/g, pokemon);
				});
			}

			let searchResults = document.getElementById("search-results")!;
			searchResults.innerHTML = ulString;
		});
	}
}
export const module = new Module();

window.addEventListener("load", () => {});
