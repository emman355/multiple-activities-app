"use client";

import { useState, useMemo } from "react";
import { PokemonWithUpload } from "../../types";
import Image from "next/image";
import Typography from "@/components/ui/typography";
import { IoSearch } from "react-icons/io5";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, CalendarDays, Check } from "lucide-react";
import { formatPokemonId } from "@/lib/utils";
import Link from "next/link";



export default function PokemonList({ pokemonList }: { pokemonList: PokemonWithUpload[] }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<"name" | "upload_date">("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const itemsPerPage = 15;

  const filteredList = useMemo(() => {
    let list = pokemonList.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (sortBy === "name") {
      list = [...list].sort((a, b) =>
        sortOrder === "asc"
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name)
      );
    } else if (sortBy === "upload_date") {
      list = [...list].sort((a, b) =>
        sortOrder === "asc"
          ? new Date(a.upload_date).getTime() - new Date(b.upload_date).getTime()
          : new Date(b.upload_date).getTime() - new Date(a.upload_date).getTime()
      );
    }

    return list;
  }, [pokemonList, searchTerm, sortBy, sortOrder]);

  const totalPages = Math.max(1, Math.ceil(filteredList.length / itemsPerPage));
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredList.slice(startIndex, startIndex + itemsPerPage);

  const isActive = (type: "name" | "upload_date", order: "asc" | "desc") =>
    sortBy === type && sortOrder === order;

  return (
    <div className="flex flex-col gap-10">
      {/* Search + Sort */}
      <div className="flex flex-col gap-4">
        {/* Search */}
        <div className="relative w-full sm:w-1/2">
          <IoSearch className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search Pokémon by name..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="pl-9"
          />
        </div>

        {/* Sort Dropdowns */}
        <div className="flex gap-2">
          {/* Sort by Name */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                Sort by Name
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="animate-in fade-in slide-in-from-top-2 duration-200">
              <DropdownMenuItem
                onClick={() => {
                  setSortBy("name");
                  setSortOrder("asc");
                  setCurrentPage(1);
                }}
                className={isActive("name", "asc") ? "bg-gray-300 font-bold" : ""}
              >
                A–Z
                {isActive("name", "asc") && <Check className="ml-auto h-4 w-4 text-primary" />}
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setSortBy("name");
                  setSortOrder("desc");
                  setCurrentPage(1);
                }}
                className={isActive("name", "desc") ? "bg-gray-300 font-bold" : ""}
              >
                Z–A
                {isActive("name", "desc") && <Check className="ml-auto h-4 w-4 text-primary" />}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Sort by Date */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <CalendarDays className="h-4 w-4" />
                Sort by Date
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="animate-in fade-in slide-in-from-top-2 duration-200">
              <DropdownMenuItem
                onClick={() => {
                  setSortBy("upload_date");
                  setSortOrder("desc");
                  setCurrentPage(1);
                }}
                className={isActive("upload_date", "desc") ? "bg-muted font-semibold" : ""}
              >
                Newest
                {isActive("upload_date", "desc") && <Check className="ml-auto h-4 w-4 text-primary" />}
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setSortBy("upload_date");
                  setSortOrder("asc");
                  setCurrentPage(1);
                }}
                className={isActive("upload_date", "asc") ? "bg-muted font-semibold" : ""}
              >
                Oldest
                {isActive("upload_date", "asc") && <Check className="ml-auto h-4 w-4 text-primary" />}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-5">
        {currentItems.map((pokemon) => (
          <Link
            href={`activity-4/${pokemon.name}`}
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

            <div className="flex flex-col items-center">
              <Typography variant="caption">{pokemon.name}</Typography>
              <Typography variant="caption">{formatPokemonId(Number(pokemon.id))}</Typography>

            </div>
          </Link>
        ))}
      </div>

      {totalPages > 0 && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={(e) => {
                  e.preventDefault();
                  setCurrentPage((p) => Math.max(p - 1, 1));
                }}
              />
            </PaginationItem>

            {/* Ellipsis before current range */}
            {currentPage > 3 && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}

            {/* Show a window around the current page */}
            {Array.from({ length: totalPages })
              .map((_, idx) => idx + 1)
              .filter((page) => page >= currentPage - 1 && page <= currentPage + 1)
              .map((page) => (
                <PaginationItem key={page}>
                  <PaginationLink
                    isActive={currentPage === page}
                    onClick={(e) => {
                      e.preventDefault();
                      setCurrentPage(page);
                    }}
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              ))}

            {/* Ellipsis after current range */}
            {currentPage < totalPages - 2 && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}

            <PaginationItem>
              <PaginationNext
                onClick={(e) => {
                  e.preventDefault();
                  setCurrentPage((p) => Math.min(p + 1, totalPages));
                }}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}

    </div>
  );
}
