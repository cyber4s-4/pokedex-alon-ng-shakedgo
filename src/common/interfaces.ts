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
	id: number;
	learned_by_pokemon: Pointer[];
	name: string;
	power: number;
	pp: number;
	priority: number;
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
	id: number;
	moves: Pointer[];
	name: string;
	pokemon: { pokemon: Pointer }[];
}

export interface StatData {
	name: string;
	value: number;
}

export interface Bag {
	[index: string]: PokemonData;
}
