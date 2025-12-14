"use client";

import { IoSearch } from "react-icons/io5";
import { Input } from "@/components/ui/input";

type Props = {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;       // 👈 customizable placeholder
  className?: string;         // 👈 allow styling overrides
  icon?: React.ReactNode;     // 👈 allow custom icon
};

export default function SearchBar({
  value,
  onChange,
  placeholder = "Search...",
  className = "",
  icon,
}: Props) {
  return (
    <div className={`relative w-full sm:w-1/2 ${className}`}>
      {icon ?? (
        <IoSearch className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      )}
      <Input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-9"
      />
    </div>
  );
}
