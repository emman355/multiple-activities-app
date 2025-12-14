"use client";

import { useState, useMemo } from "react";
import { PokemonWithUpload } from "../../types";
import Image from "next/image";
import Typography from "@/components/ui/typography";
import { capitalizeFirst, filterAndSort, formatDateToDMY, formatPokemonId } from "@/lib/utils";
import Link from "next/link";
import PaginationControls from "@/app/(root)/_components/pagination-controls";
import SearchBar from "@/app/(root)/_components/search-bar";
import PokemonSortControls from "../pokemon-sort-controls";

export default function PokemonList({ pokemonList }: { pokemonList: PokemonWithUpload[] }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<"name" | "upload_date">("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const itemsPerPage = 15;


  const filteredList = useMemo(
    () => filterAndSort(pokemonList, sortBy, sortOrder, "name", searchTerm),
    [pokemonList, searchTerm, sortBy, sortOrder]
  );

  const totalPages = Math.max(1, Math.ceil(filteredList.length / itemsPerPage));
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredList.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="flex flex-col gap-10">
      {/* Search + Sort */}
      <div className="flex flex-col gap-4">
        {/* Search */}
        <SearchBar
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder="Search Pokémon by name..."
        />
        {/* Sort Controls */}
        <PokemonSortControls
          sortBy={sortBy}
          sortOrder={sortOrder}
          onChange={(by, order) => {
            setSortBy(by);
            setSortOrder(order);
            setCurrentPage(1);
          }}
        />
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-5">
        {currentItems.map((pokemon) => (
          <Link
            href={{
              pathname: `/activity-4/${pokemon.name}`,
              query: { uploadDate: pokemon.upload_date.toISOString() }, // <-- this is a Date
            }}
            key={pokemon.id}
            className="flex flex-col rounded-lg border gap-5 border-gray-800 p-4 shadow-sm hover:shadow-md transition"
          >
            <div className="flex justify-center h-40 relative">
              <Image
                alt={`${pokemon.name}-sprite`}
                src={pokemon.image_url}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-contain"
                loading="eager"
                priority
                unoptimized
              />
            </div>

            <div className="flex justify-between">
              <div className="flex flex-col gap-1">
                <Typography variant="caption">{capitalizeFirst(pokemon.name)}</Typography>
                <Typography variant="caption" className="text-gray-600">{formatDateToDMY(pokemon.upload_date)}</Typography>
              </div>
              <Typography variant="caption">#{formatPokemonId(Number(pokemon.id))}</Typography>
            </div>

          </Link>
        ))}
      </div>

      {/* Pagination */}
      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        windowSize={1} // show 2 pages before/after current
      />

    </div>
  );
}
