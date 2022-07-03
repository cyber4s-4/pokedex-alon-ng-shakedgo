import { BagComponent } from "./components/BagComponent";
import { NavbarComponent } from "./components/NavbarComponent";
import { SearchResult } from "./components/SearchResultComponent";
import { checkForBag } from "./shared/globals";

checkForBag();

class Module {
	searchValue: Promise<{ name: string; type: string; value: string }[]>;

	constructor() {
		this.searchValue = this.getSearchValues();
	}

	onLoad() {
		let navbar = new NavbarComponent(document.getElementsByTagName("body")[0]);
		navbar.render();

		const bag = new BagComponent(document.getElementsByTagName("body")[0]);
		bag.render();
	}

	async getSearchValues(): Promise<{ name: string; type: string; value: string }[]> {
		let allPokemons = await fetch("https://pokeapi.co/api/v2/pokemon?limit=1000000")
			.then((res) => res.json())
			.then((res) => res["results"])
			.then((res) =>
				res.map((pokemon: { name: string }) => ({
					name: pokemon.name.replace(/-/g, " "),
					value: pokemon.name,
					type: "pokemon",
				}))
			);

		let allTypes = await fetch("https://pokeapi.co/api/v2/type?limit=1000000")
			.then((res) => res.json())
			.then((res) => res["results"])
			.then((res) =>
				res.map((pokemon: { name: string; url: string }) => ({
					name: pokemon.name.replace(/-/g, " "),
					value: pokemon.url.split("/")[6],
					type: "type",
				}))
			);

		let allMoves = await fetch("https://pokeapi.co/api/v2/move?limit=1000000")
			.then((res) => res.json())
			.then((res) => res["results"])
			.then((res) =>
				res.map((pokemon: { name: string; url: string }) => ({
					name: pokemon.name.replace(/-/g, " "),
					value: pokemon.url.split("/")[6],
					type: "move",
				}))
			);

		return allPokemons
			.concat(allTypes)
			.concat(allMoves)
			.map((pokemon: { name: string; type: string }) => pokemon);
	}

	updateSearchResults() {
		let searchTerm = (document.getElementById("search") as HTMLInputElement).value.toLocaleLowerCase();
		let validPokemons = this.searchValue.then((pokemons) =>
			pokemons.filter((pokemon) => pokemon.name.startsWith(searchTerm))
		);

		let ulString = "";
		let searchResultsUL = document.getElementById("search-results")!;

		validPokemons.then((pokemons) => {
			if (searchTerm !== "") {
				pokemons.forEach((pokemon) => {
					let nameCapitalize = pokemon.name
						.split(" ")
						.map((word) => {
							if (word[0]) {
								return word[0].toUpperCase() + word.slice(1);
							}
						})
						.join(" ");

					let searchResult = new SearchResult(nameCapitalize, pokemon.type, pokemon.value, searchResultsUL);
					ulString += searchResult.getLayout();
				});
			}

			searchResultsUL.innerHTML = ulString;
		});
	}
}
export const module = new Module();

window.addEventListener("load", () => {
	module.onLoad();
});
