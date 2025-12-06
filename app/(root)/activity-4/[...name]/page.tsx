import { Suspense } from "react";
import { PokemonDetailsSkeleton } from "./_components/skeleton-ui/pokemon-details-skeleton";
import PokemonDetailsComponent from "./_components/pokemon-details";

type PokemonName = {
  name: string;
};

export default async function page({ params }: { params: Promise<PokemonName> }) {
  const { name } = await params;
  return (
    <Suspense fallback={<PokemonDetailsSkeleton />}>
      <PokemonDetailsComponent name={name[0]} />
    </Suspense>
  )
}
