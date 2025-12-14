import { Suspense } from "react";
import { PokemonDetailsSkeleton } from "./_components/skeleton-ui/pokemon-details-skeleton";
import PokemonDetailsComponent from "./_components/pokemon-details";

type PokemonName = {
  name: string;
};

export default async function page({ params, searchParams }: { params: Promise<PokemonName>, searchParams: Promise<{ uploadDate: string }> }) {
  const { name } = await params;
  const { uploadDate } = await searchParams;
  return (
    <Suspense fallback={<PokemonDetailsSkeleton />}>
      <PokemonDetailsComponent name={name[0]} uploadDate={uploadDate} />
    </Suspense>
  )
}
