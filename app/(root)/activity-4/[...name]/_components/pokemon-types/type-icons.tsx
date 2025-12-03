import * as PokemonIcons from "@/public/icons/pokemon-icons";
import { PokemonTypeColor } from "../../../types";
import { JSX } from "react";

export const TYPE_ICON_MAP: Record<PokemonTypeColor, JSX.Element> = {
  normal: <PokemonIcons.Normal />,
  fighting: <PokemonIcons.Fighting />,
  flying: <PokemonIcons.Flying />,
  poison: <PokemonIcons.Poison />,
  ground: <PokemonIcons.Ground />,
  rock: <PokemonIcons.Rock />,
  bug: <PokemonIcons.Bug />,
  ghost: <PokemonIcons.Ghost />,
  steel: <PokemonIcons.Steel />,
  fire: <PokemonIcons.Fire />,
  water: <PokemonIcons.Water />,
  grass: <PokemonIcons.Grass />,
  electric: <PokemonIcons.Electric />,
  psychic: <PokemonIcons.Psychic />,
  ice: <PokemonIcons.Ice />,
  dragon: <PokemonIcons.Dragon />,
  dark: <PokemonIcons.Dark />,
  fairy: <PokemonIcons.Fairy />,
};
