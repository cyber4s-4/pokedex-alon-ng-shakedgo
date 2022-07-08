import { BagComponent } from "./components/BagComponent";
import { NavbarComponent } from "./components/NavbarComponent";
import { SearchResult } from "./components/SearchResultComponent";
import { checkForBag } from "./shared/globals";

checkForBag();

class Module {
	searchValues: Promise<{ name: string; url: string }[]>;

	constructor() {
		this.searchValues = this.getSearchValues();
	}

	onLoad() {
		let navbar = new NavbarComponent(document.getElementsByTagName("body")[0]);
		navbar.render();

		const bag = new BagComponent(document.getElementsByTagName("body")[0]);
		bag.render();
	}

	async getSearchValues(): Promise<{ name: string; url: string }[]> {
		let allPokemons = await fetch("http://localhost:4000/api/pokemon")
			.then((res) => res.json())
			.then((res) => res["results"])
			.then((res) =>
				res.map((pokemon: { name: string; url: string }) => ({
					name: pokemon.name.replace(/-/g, " "),
					url: `http://localhost:4000/pokemon/${pokemon.name}`,
				}))
			);

		let allTypes = await fetch("http://localhost:4000/api/type")
			.then((res) => res.json())
			.then((res) => res["results"])
			.then((res) =>
				res.map((type: { name: string; url: string }) => ({
					name: type.name.replace(/-/g, " "),
					url: `http://localhost:4000/type/${type.name}`,
				}))
			);

		let allMoves = await fetch("http://localhost:4000/api/move")
			.then((res) => res.json())
			.then((res) => res["results"])
			.then((res) =>
				res.map((move: { name: string; url: string }) => ({
					name: move.name.replace(/-/g, " "),
					url: `http://localhost:4000/move/${move.name}`,
				}))
			);

		return allPokemons.concat(allTypes).concat(allMoves);
	}

	updateSearchResults() {
		let searchTerm = (document.getElementById("search") as HTMLInputElement).value.toLocaleLowerCase();
		let validSearches = this.searchValues.then((searchValues) =>
			searchValues.filter((value) => value.name.startsWith(searchTerm))
		);

		let ulString = "";
		let searchResultsUL = document.getElementById("search-results")!;

		validSearches.then((validSearches) => {
			if (searchTerm !== "") {
				validSearches.forEach((validSearch) => {
					let name = validSearch.name.replace(/-/g, " ");

					let searchResult = new SearchResult(name, validSearch.url, searchResultsUL);
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
