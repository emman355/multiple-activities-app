import Typography from '@/components/ui/typography';
import { Suspense } from 'react';
import PokemonListSkeleton from './_components/skeleton-card';
import FetchedPokemons from './_fetched-pokemons';

export default function ActivityFour() {
  return (
    <div className="w-full flex flex-col items-center gap-12">
      <Typography variant="h2">Pokémon Review</Typography>
      <div className="max-w-7xl flex flex-col w-full gap-10">
        <section>
          <header className="flex flex-col items-start">
            <Typography variant="h3" className="font-semibold">
              Find your favorite Pokémon
            </Typography>
            <Typography variant="body2">Search for the entire colection of Pokémon</Typography>
          </header>
        </section>

        <section>
          <Suspense fallback={<PokemonListSkeleton />}>
            <FetchedPokemons />
          </Suspense>
        </section>
      </div>
    </div>
  );
}
