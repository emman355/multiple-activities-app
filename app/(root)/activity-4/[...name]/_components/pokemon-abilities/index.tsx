import Typography from '@/components/ui/typography';
import { NormalizedAbility } from '../../../types';

export default function PokemonAbilities({ abilities }: { abilities: NormalizedAbility[] }) {
  return (
    <div className="flex flex-col gap-2" >
      <Typography variant="subtitle" className="font-semibold">Abilities</Typography>
      <ul className="flex flex-col gap-1">
        {abilities.map(({ name, is_hidden }) => {
          // const icon = ABILITY_ICONS[a.ability.name.toLowerCase()] ?? ABILITY_ICONS["default"];
          return (
            <li key={name} className="flex items-center gap-2">
              <Typography variant="body2" className="capitalize">
                {name.replace("-", " ")}
              </Typography>
              {is_hidden && (
                <Typography variant="caption" className="text-muted-foreground">
                  (Hidden)
                </Typography>
              )}
            </li>
          );
        })}
      </ul>
    </div >
  )
}
