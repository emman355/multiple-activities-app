export type Pokemon = {
  name: string;
  url: string;
};

export type PokemonWithUpload = Pokemon & {
  upload_date: Date;
  id: string;
  image_url: string;
};

// types/pokemon.ts

export interface AbilityInfo {
  name: string;
  url: string;
}

export interface Ability {
  ability: AbilityInfo;
  is_hidden: boolean;
  slot: number;
}

export interface NormalizedAbility {
  name: string;
  is_hidden: boolean;
}

export interface StatInfo {
  name: string;
  url: string;
}

export interface Stat {
  base_stat: number;
  effort: number;
  stat: StatInfo;
}

export interface NormalizedStat {
  name: string;
  base: number;
}

export interface TypeInfo {
  name: string;
  url: string;
}

export interface PokemonType {
  slot: number;
  type: TypeInfo;
}

export interface PokemonColor {
  name: string;
  url: string;
}

export interface PokemonDetails {
  id: number;
  abilities: NormalizedAbility[];
  stats: NormalizedStat[];
  description: string;
  types: PokemonType[];
  color: PokemonColor;
  image_url: string;
  name: string,
}

export type PokemonTypeColor =
  | "normal"
  | "fire"
  | "water"
  | "grass"
  | "electric"
  | "ice"
  | "fighting"
  | "poison"
  | "ground"
  | "flying"
  | "psychic"
  | "bug"
  | "rock"
  | "ghost"
  | "dragon"
  | "dark"
  | "steel"
  | "fairy";


export type PokemonReview = {
  id: string;   
  pokemonId: number;
  userId: string;    
  content: string;
  rating: number;  
  pokemonName: string;
  uploadDate: string;
  userEmail: string;
}