import Image from "next/image"
import type { PokemonDetails } from "../../../types"
import Typography from "@/components/ui/typography"
import PokemonStats from "../pokemon-stats"
import { capitalizeFirst, formatPokemonId } from "@/lib/utils"
import PokemonTypes from "../pokemon-types"
import PokemonAbilities from "../pokemon-abilities"

export default function PokemonDetails({ details }: { details: PokemonDetails }) {
  return (
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
  )
}
