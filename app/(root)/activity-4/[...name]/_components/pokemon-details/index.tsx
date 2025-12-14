import Image from "next/image"
import type { Ability, PokemonDetails, Stat } from "../../../types"
import Typography from "@/components/ui/typography"
import PokemonStats from "../pokemon-stats"
import { capitalizeFirst, formatDateToDMY, formatPokemonId } from "@/lib/utils"
import PokemonTypes from "../pokemon-types"
import PokemonAbilities from "../pokemon-abilities"
import { Suspense } from "react"
import PokemonReviews from "../pokemon-reviews"
import ReviewsSkeleton from "../skeleton-ui/review-skeleton"

export default async function PokemonDetailsComponent({ name, uploadDate }: { name: string, uploadDate: string }) {
  const pokemonApi = process.env.NEXT_PUBLIC_POKEMON_API
  const [pokemonRes, speciesRes] = await Promise.all([
    fetch(`${pokemonApi}/pokemon/${name}`, {
      next: {
        revalidate: 60,
        tags: ["pokemon-details"], // optional: tag for manual invalidation
      },
    }),
    fetch(`${pokemonApi}/pokemon-species/${name}`, {
      next: {
        revalidate: 60 * 60 * 24,
        tags: ["pokemon-species"], // optional: tag for manual invalidation
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

  const details: PokemonDetails = {
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
    name,
  };
  
  return (
    <div className='w-full flex justify-center p-10'>
      <div className='max-w-7xl flex flex-col w-full gap-10'>
        <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-5">
          <div className="flex justify-center h-96 lg:h-auto relative">
            <Image
              alt={`${details.image_url}-sprite`}
              src={details.image_url}
              fill
              className="object-contain"
              loading="eager"
              priority
              unoptimized
            />
          </div>
          <div className="flex flex-col p-2 gap-8">
            {/* title */}
            <div className="flex flex-col">
              <Typography variant="h2">{`#${formatPokemonId(details.id)} ${capitalizeFirst(details.name)}`}</Typography>
              <Typography variant="body1">{details.description}</Typography>
            </div>
            <div className="flex flex-col gap-2">
              <Typography variant="subtitle">Upload Date</Typography>
              <Typography variant="caption">{formatDateToDMY(new Date(uploadDate))}</Typography>
            </div>

            {/* type */}
            <div className="flex flex-col gap-2">
              <Typography variant="subtitle">Type</Typography>
              <PokemonTypes types={details.types} />
            </div>

            {/* abilities */}
            <PokemonAbilities abilities={details.abilities} />

            {/* base stats */}
            <PokemonStats stats={details.stats} />
          </div>
        </div>
        <Suspense fallback={<ReviewsSkeleton />}>
          <PokemonReviews name={name} details={details} />
        </Suspense>
      </div>
    </div>
  )
}
