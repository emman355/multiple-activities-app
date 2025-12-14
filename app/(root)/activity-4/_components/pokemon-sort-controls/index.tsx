import SortControls, { SortOption } from "@/app/(root)/_components/sort-controls";
import { CalendarDays } from "lucide-react";

const pokemonSortOptions: SortOption<"name" | "upload_date">[] = [
  {
    key: "name",
    label: "Sort by Name",
    orders: [
      { order: "asc", label: "A–Z" },
      { order: "desc", label: "Z–A" },
    ],
  },
  {
    key: "upload_date",
    label: "Sort by Date",
    icon: <CalendarDays className="h-4 w-4" />,
    orders: [
      { order: "desc", label: "Newest" },
      { order: "asc", label: "Oldest" },
    ],
  },
];

export default function PokemonSortControls({
  sortBy,
  sortOrder,
  onChange,
}: {
  sortBy: "name" | "upload_date";
  sortOrder: "asc" | "desc";
  onChange: (sortBy: "name" | "upload_date", sortOrder: "asc" | "desc") => void;
}) {
  return (
    <SortControls
      sortBy={sortBy}
      sortOrder={sortOrder}
      options={pokemonSortOptions}
      onChange={onChange}
    />
  );
}
