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
	accuracy: number;
	contest_combos: any;
	contest_effect: { url: string };
	contest_type: Pointer;
	damage_class: Pointer;
	effect_chance: any;
	effect_changes: any[];
	effect_entries: { effect: string; language: Pointer; short_effect: string };
	flavor_text_entries: {}[];
	generation: Pointer;
	id: number;
	learned_by_pokemon: Pointer[];
	machines: any[];
	meta: {};
	name: string;
	names: {}[];
	past_values: any[];
	power: number;
	pp: number;
	priority: number;
	stat_changes: any[];
	super_contest_effect: {};
	target: Pointer;
	type: Pointer;
}

export interface PokemonData {
	abilities: AbilityData[];
	height: number;
	id: number;
	is_default: boolean;
	moves: { move: Pointer }[];
	name: string;
	sprites: { front_default: string };
	stats: { base_stat: number; effort: number; stat: Pointer }[];
	types: { type: Pointer }[];
	weight: number;
	parents?: [Pointer, Pointer];
}

export interface TypeData {
	damage_relations: {
		[index: string]: Pointer[];
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
	pokemon: { pokemon: Pointer }[];
}

export interface StatData {
	name: string;
	value: number;
}

export interface Bag {
	[index: string]: PokemonData;
}
