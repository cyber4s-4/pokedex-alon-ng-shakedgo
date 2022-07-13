import { BagComponent } from "../../common/components/BagComponent";
import { NavbarComponent } from "../../common/components/NavbarComponent";
import { SearchResult } from "../../common/components/SearchResultComponent";
import { checkForBag } from "../../common/globals";

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
		let allPokemons = await fetch("/api/pokemon")
			.then((res) => res.json())
			.then((res) => res["results"])
			.then((res) =>
				res.map((pokemon: { name: string; url: string }) => ({
					name: pokemon.name.replace(/-/g, " "),
					url: `/pokemon/${pokemon.name}`,
				}))
			);

		let allTypes = await fetch("/api/type")
			.then((res) => res.json())
			.then((res) => res["results"])
			.then((res) =>
				res.map((type: { name: string; url: string }) => ({
					name: type.name.replace(/-/g, " "),
					url: `/type/${type.name}`,
				}))
			);

		let allMoves = await fetch("/api/move")
			.then((res) => res.json())
			.then((res) => res["results"])
			.then((res) =>
				res.map((move: { name: string; url: string }) => ({
					name: move.name.replace(/-/g, " "),
					url: `/move/${move.name}`,
				}))
			);

		return allPokemons
			.concat(allTypes)
			.concat(allMoves)
			.sort((a: { url: string }, b: { url: string }) => a.url.localeCompare(b.url));
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
