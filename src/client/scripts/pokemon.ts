import { NavbarComponent } from "../../common/components/NavbarComponent";
import { PokemonComponent } from "../../common/components/PokemonCopmonent";
import { PokemonData } from "../../common/interfaces";
import { checkForBag } from "../../common/globals";

checkForBag();

export class Pokemon {
	async onLoad() {
		let navbar = new NavbarComponent(document.getElementsByTagName("body")[0]);
		navbar.render();

		let pathnameSplit = location.pathname.split("/");
		const pokemonName = pathnameSplit[pathnameSplit.length - 1];
		let res = await (await fetch("/api/pokemon/" + pokemonName)).json();

		let types = res["types"].map((t: string) => ({ type: { name: t, url: "" } }));
		console.log(res);

		let data: PokemonData = {
			abilities: [],
			height: res["height"],
			id: res["id"],
			is_default: true,
			moves: [],
			name: res["name"],
			sprites: { front_default: res["sprite"] },
			stats: [
				{ base_stat: res["hp"], effort: 0, stat: { name: "hp", url: "" } },
				{ base_stat: res["attack"], effort: 0, stat: { name: "attack", url: "" } },
				{ base_stat: res["defense"], effort: 0, stat: { name: "defense", url: "" } },
				{ base_stat: res["specialattack"], effort: 0, stat: { name: "special-attack", url: "" } },
				{ base_stat: res["specialdefense"], effort: 0, stat: { name: "special-defense", url: "" } },
				{ base_stat: res["speed"], effort: 0, stat: { name: "speed", url: "" } },
			],
			types: types,
			weight: res["weight"],
		};
		this.renderPage(data);
	}

	// Renders PokemonCopmonent.
	renderPage(data: PokemonData) {
		let pokemon = new PokemonComponent(document.getElementById("pokemons")!, data);
		pokemon.render();
	}
}

export const pokemon = new Pokemon();

window.addEventListener("load", () => {
	pokemon.onLoad();
});
