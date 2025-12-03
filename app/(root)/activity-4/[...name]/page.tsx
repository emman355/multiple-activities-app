import { Ability, Stat } from "../types";
import PokemonDetails from "./_components/pokemon-details";

type PokemonName = {
  name: string;
};

export default async function page({ params }: { params: Promise<PokemonName> }) {
  const { name } = await params;

  const [pokemonRes, speciesRes] = await Promise.all([
    fetch(`https://pokeapi.co/api/v2/pokemon/${name}`, {
      next: {
        revalidate: 60,
        tags: ["pokemon-details"],
      },
    }),
    fetch(`https://pokeapi.co/api/v2/pokemon-species/${name}`, {
      next: {
        revalidate: 60,
        tags: ["species"],
      },
    }),
  ]);

  const { id, abilities, stats, types, sprites } = await pokemonRes.json();
  const { flavor_text_entries, color } = await speciesRes.json();

  const englishFlavorTexts = flavor_text_entries.filter(
    (entry: { language: { name: string }; flavor_text?: string }) =>
      entry.language.name === "en"
  );

  const description = englishFlavorTexts[8]?.flavor_text ?? "No description available.";

  const details = {
    id,
    abilities: abilities.map((a: Ability) => ({
      name: a.ability.name,
      is_hidden: a.is_hidden,
    })),
    stats: stats.map((s: Stat) => ({
      name: s.stat.name,
      base: s.base_stat,
    })), // normalized for UI,
    description,
    types,
    color,
    image_url: sprites?.other?.dream_world?.front_default,
    name: name[0],
  };

  return (
    <div className='w-full flex flex-col items-center gap-12 p-10'>
      <div className='max-w-7xl flex flex-col w-full gap-10'>
        <PokemonDetails details={details} />
      </div>
    </div>
  )

}
