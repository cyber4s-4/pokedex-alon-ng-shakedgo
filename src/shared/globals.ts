export const searchResultTemplate = `<li id='%name' onclick='location.href=location.origin + "/pokemon.html?pokemon=%name"'>%name</li>`;

export interface PokemonData {
	abilities: [];
	base_experience: number;
	forms: [];
	game_indices: [];
	height: number;
	held_items: [];
	id: number;
	is_default: boolean;
	location_area_encounters: string;
	moves: [];
	name: string;
	order: number;
	past_types: any[];
	species: {};
	sprites: any;
	stats: [];
	types: [];
	weight: number;
}
