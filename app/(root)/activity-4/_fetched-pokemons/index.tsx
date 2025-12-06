import React from 'react'
import { Pokemon, PokemonWithUpload } from '../types';
import PokemonList from '../_components/pokemon-list';

// Generate a random date within the last year
export function randomUploadDate(): Date {
  const now = new Date();
  const pastYear = new Date();
  pastYear.setFullYear(now.getFullYear() - 1);

  const randomTime =
    pastYear.getTime() +
    Math.random() * (now.getTime() - pastYear.getTime());

  return new Date(randomTime);
}

export default async function FetchedPokemons() {
  'use cache'
  const res = await fetch(`${process.env.NEXT_PUBLIC_POKEMON_API}/pokemon?limit=649&offset=0`, {
    next: {
      revalidate: 86400, // 24 hours in seconds
      tags: ["pokemon-review"],
    },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch Pokémon: ${res.status} ${res.statusText}`);
  }
  
  const data = await res.json();

  const pokemonList: PokemonWithUpload[] = data.results.map((pokemon: Pokemon) => {
    const id = pokemon.url.split("/")[6];
    return {
      id,
      name: pokemon.name,
      image_url: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`,
      upload_date: randomUploadDate(), // each one gets its own random date
    };
  });

  return <PokemonList pokemonList={pokemonList} />;
}
