import React from 'react'
import { Pokemon, PokemonWithUpload } from '../types'
import PokemonList from '../_components/pokemon-list'
import { cacheLife, cacheTag } from 'next/cache'

function randomUploadDate(): Date {
  const now = Date.now()
  const pastYear = new Date()
  pastYear.setFullYear(new Date().getFullYear() - 1)
  const randomTime = pastYear.getTime() + Math.random() * (now - pastYear.getTime())
  return new Date(randomTime)
}

async function getPokemons(): Promise<PokemonWithUpload[]> {
  if (!process.env.NEXT_PUBLIC_POKEMON_API) {
    throw new Error("Missing NEXT_PUBLIC_POKEMON_API env variable")
  }

  const res = await fetch(`${process.env.NEXT_PUBLIC_POKEMON_API}/pokemon?limit=649&offset=0`)
  if (!res.ok) throw new Error(`Failed to fetch Pokémon: ${res.status} ${res.statusText}`)

  const data = await res.json()
  return data.results.map((pokemon: Pokemon) => {
    const id = new URL(pokemon.url).pathname.split("/").filter(Boolean).pop()!
    return {
      id,
      name: pokemon.name,
      image_url: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`,
      upload_date: randomUploadDate(),
    }
  })
}

export default async function FetchedPokemons() {
  'use cache'
  cacheTag('pokemon-list')
  cacheLife({ revalidate: 60 * 60 * 24, expire: 60 * 60 * 24 * 7 })

  const pokemonList = await getPokemons()
  return <PokemonList pokemonList={pokemonList} />
}
