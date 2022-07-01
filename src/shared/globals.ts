export const searchResultTemplate = `<li id='%name' onclick='location.href=location.origin + "/pokemon.html?pokemon=%name"'>%name</li>`;

export interface AbilityData {
	ability: {
		name: string;
		url: string;
	};
	is_hidden: boolean;
	slot: number;
}

export interface MoveData {
	move: {
		name: "transform";
		url: "https://pokeapi.co/api/v2/move/144/";
	};
	version_group_details: any[];
}

export interface PokemonData {
	abilities: AbilityData[];
	base_experience: number;
	forms: any[];
	game_indices: any[];
	height: number;
	held_items: any[];
	id: number;
	is_default: boolean;
	location_area_encounters: string;
	moves: any[];
	name: string;
	order: number;
	past_types: any[];
	species: {};
	sprites: any;
	stats: any[];
	types: any[];
	weight: number;
}

export interface TypeData {
	name: string;
	url: string;
}

export interface Bag {
	[index: string]: PokemonData;
}

export function checkForBag() {
	if (!localStorage.getItem("bag")) {
		localStorage.setItem("bag", "{}");
	}
}
