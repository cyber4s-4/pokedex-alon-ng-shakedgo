import { BagComponent } from "../../common/components/BagComponent";
import { NavbarComponent } from "../../common/components/NavbarComponent";
import { SearchResult } from "../../common/components/SearchResultComponent";
import { checkForBag } from "../../common/globals";

checkForBag();

class Module {
	onLoad() {
		let navbar = new NavbarComponent(document.getElementsByTagName("body")[0]);
		navbar.render();

		const bag = new BagComponent(document.getElementsByTagName("body")[0]);
		bag.render();
	}

	async getSearchValues(term: string): Promise<{ name: string; url: string }[]> {
		let allPokemons = await fetch(`/api/pokemon?term=${term}`).then((res) => res.json());
		let allTypes = await fetch(`/api/type?term=${term}`).then((res) => res.json());
		let allMoves = await fetch(`/api/move?term=${term}`).then((res) => res.json());

		return allPokemons
			.concat(allTypes)
			.concat(allMoves)
			.sort((a: { name: string }, b: { name: string }) => a.name.localeCompare(b.name));
	}

	updateSearchResults() {
		let searchTerm = (document.getElementById("search") as HTMLInputElement).value.toLocaleLowerCase();
		let validSearches = this.getSearchValues(searchTerm);

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
