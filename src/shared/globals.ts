export interface Pointer {
	name: string;
	url: string;
}

export interface AbilityData {
	ability: Pointer;
	is_hidden: boolean;
	slot: number;
}

export interface MoveData {
	move: Pointer;
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
	stats: StatData[];
	types: any[];
	weight: number;
}

export interface TypeData {
	damage_relations: {
		double_damage_from: Pointer[];
		double_damage_to: Pointer[];
		half_damage_from: Pointer[];
		half_damage_to: Pointer[];
		no_damage_from: Pointer[];
		no_damage_to: Pointer[];
	};
	game_indices: any[];
	generation: {};
	id: number;
	move_damage_class: {};
	moves: Pointer[];
	name: string;
	names: any[];
	past_damage_relations: any[];
	pokemon: Pointer[];
}

export interface StatData {
	base_stat: number;
	effort: number;
	stat: Pointer;
}

export interface Bag {
	[index: string]: PokemonData;
}

export const pokeballImages = {
	open: "./img/pokeball-open.png",
	closed: "./img/pokeball-closed.png",
};

export function checkForBag() {
	if (!localStorage.getItem("bag")) {
		localStorage.setItem("bag", "{}");
	}
}
