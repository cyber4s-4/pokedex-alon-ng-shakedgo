import { SearchResult } from "./components/SearchResultComponent";

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

		let searchResultsUL = document.getElementById("search-results")!;

		validPokemons.then((pokemons) => {
			if (searchTerm !== "") {
				pokemons.forEach((pokemon) => {
					let searchResult = new SearchResult(pokemon, searchResultsUL);
					ulString += searchResult.layout;
				});
			}

			searchResultsUL.innerHTML = ulString;
		});
	}
}
export const module = new Module();

window.addEventListener("load", () => {});
