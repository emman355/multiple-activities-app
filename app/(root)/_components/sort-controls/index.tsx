"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, Check } from "lucide-react";

export type SortOption<T extends string> = {
  key: T;               // field to sort by
  label: string;        // label shown in button
  icon?: React.ReactNode; // optional icon
  orders: { order: "asc" | "desc"; label: string }[]; // available orders
};

type Props<T extends string> = {
  sortBy: T;
  sortOrder: "asc" | "desc";
  options: SortOption<T>[];
  onChange: (sortBy: T, sortOrder: "asc" | "desc") => void;
};

export default function SortControls<T extends string>({
  sortBy,
  sortOrder,
  options,
  onChange,
}: Props<T>) {
  const isActive = (key: T, order: "asc" | "desc") =>
    sortBy === key && sortOrder === order;

  return (
    <div className="flex gap-2">
      {options.map((opt) => (
        <DropdownMenu key={opt.key}>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2">
              {opt.icon}
              {opt.label}
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {opt.orders.map((o) => (
              <DropdownMenuItem
                key={o.order}
                onClick={() => onChange(opt.key, o.order)}
                className={isActive(opt.key, o.order) ? "bg-muted font-semibold" : ""}
              >
                {o.label}
                {isActive(opt.key, o.order) && (
                  <Check className="ml-auto h-4 w-4 text-primary" />
                )}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      ))}
    </div>
  );
}
