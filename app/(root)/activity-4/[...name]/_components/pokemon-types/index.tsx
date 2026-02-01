import Typography from '@/components/ui/typography';
import { capitalizeFirst, cn } from '@/lib/utils';
import { PokemonType, PokemonTypeColor } from '../../../types';
import { TYPE_ICON_MAP } from './type-icons';

export const TYPE_COLOR_MAP: Record<PokemonTypeColor, string> = {
  normal: 'text-muted-foreground',
  fire: 'text-destructive',
  water: 'text-primary',
  grass: 'text-secondary',
  electric: 'text-[#fbbf24]',
  ice: 'text-cyan-400',
  fighting: 'text-[#ea580c]',
  poison: 'text-purple-600',
  ground: 'text-yellow-700',
  flying: 'text-sky-400',
  psychic: 'text-pink-500',
  bug: 'text-lime-600',
  rock: 'text-stone-500',
  ghost: 'text-indigo-700',
  dragon: 'text-indigo-500',
  dark: 'text-foreground/80',
  steel: 'text-slate-400',
  fairy: 'text-fuchsia-400',
};

export default function PokemonTypes({ types }: { types: PokemonType[] }) {
  return (
    <div className="flex gap-2">
      {types.map(({ type }) => {
        const RenderedIcon = TYPE_ICON_MAP[type.name as PokemonTypeColor];
        const typeColor = TYPE_COLOR_MAP[type.name as PokemonTypeColor];
        return (
          <div
            key={type.name}
            className={cn(
              'flex gap-2 rounded-4xl border border-border px-5 py-1 max-w-fit items-center'
            )}
          >
            <div className={cn(`w-6 h-6 ${typeColor ?? 'text-muted-foreground'}`)}>
              {RenderedIcon}
            </div>
            <Typography variant="body1" className="font-semibold">
              {capitalizeFirst(type.name)}
            </Typography>
          </div>
        );
      })}
    </div>
  );
}
