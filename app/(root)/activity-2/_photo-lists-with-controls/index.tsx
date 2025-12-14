"use client";

import { useState, useMemo } from "react";
import PhotoGrid from "../_components/photo-grid";
import { Photo } from "../types";
import { filterAndSort } from "@/lib/utils";
import PhotoSortControls from "../_components/photo-sort-controls";
import SearchBar from "../../_components/search-bar";
import PaginationControls from "../../_components/pagination-controls";


export default function PhotoListWithControls({ photos }: { photos: Photo[] }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<"title" | "updatedAt">("title");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;

  const filteredList = useMemo(
    () => filterAndSort(photos,  sortBy, sortOrder, "title", searchTerm),
    [photos, searchTerm, sortBy, sortOrder]
  );

  const totalPages = Math.max(1, Math.ceil(filteredList.length / itemsPerPage));
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredList.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="flex flex-col gap-10">
      {/* Search */}
      <SearchBar
        value={searchTerm}
        onChange={setSearchTerm}
        placeholder="Search photos by title..."
      />

      {/* Sort Controls */}
      <PhotoSortControls
        sortBy={sortBy}
        sortOrder={sortOrder}
        onChange={(by, order) => {
          setSortBy(by);
          setSortOrder(order);
          setCurrentPage(1);
        }}
      />

      {/* Grid */}
      <PhotoGrid fetchPhotos={currentItems} />

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
