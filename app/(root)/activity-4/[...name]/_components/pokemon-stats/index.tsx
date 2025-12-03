import { Progress } from "@/components/ui/progress";
import Typography from "@/components/ui/typography";
import { NormalizedStat } from "../../../types";

const STAT_COLORS: Record<string, string> = {
  hp: "bg-red-500",
  attack: "bg-orange-500",
  defense: "bg-yellow-500",
  "special-attack": "bg-blue-500",
  "special-defense": "bg-green-500",
  speed: "bg-pink-500",
};

export default function PokemonStats({ stats }: { stats: NormalizedStat[] }) {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-lg font-semibold">Base Stats</h2>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-2">
        {stats.map(({ name, base }) => (
          <div key={name} className="grid grid-cols-2 lg:grid-cols-2 gap-4 items-center">
            <div className="flex flex-row justify-between mb-1 items-center">
              <Typography variant="small" className="capitalize text-sm font-medium">{name.replace("-", " ")}</Typography>
              <Typography variant="small" className="font-mono">{base}</Typography>
            </div>
            <Progress
              value={base}
              className="h-3 -translate-y-0.5"
              indicatorColor={STAT_COLORS[name]}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
