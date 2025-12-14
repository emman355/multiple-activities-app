import SortControls, { SortOption } from "@/app/(root)/_components/sort-controls";
import { CalendarDays } from "lucide-react";

const foodReviewSortOptions: SortOption<"photoName" | "updatedAt">[] = [
  {
    key: "photoName",
    label: "Sort by Title",
    orders: [
      { order: "asc", label: "A–Z" },
      { order: "desc", label: "Z–A" },
    ],
  },
  {
    key: "updatedAt",
    label: "Sort by Date",
    icon: <CalendarDays className="h-4 w-4" />,
    orders: [
      { order: "desc", label: "Newest" },
      { order: "asc", label: "Oldest" },
    ],
  },
];

export default function FoodReviewSortControls({
  sortBy,
  sortOrder,
  onChange,
}: {
  sortBy: "photoName" | "updatedAt";
  sortOrder: "asc" | "desc";
  onChange: (sortBy: "photoName" | "updatedAt", sortOrder: "asc" | "desc") => void;
}) {
  return (
    <SortControls
      sortBy={sortBy}
      sortOrder={sortOrder}
      options={foodReviewSortOptions}
      onChange={onChange}
    />
  );
}
