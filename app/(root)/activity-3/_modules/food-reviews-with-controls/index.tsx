"use client";

import { useState, useMemo } from "react";
import { filterAndSort } from "@/lib/utils";
import PaginationControls from "@/app/(root)/_components/pagination-controls";
import FoodReviewSortControls from "../../_components/food-review-sort-controls";
import FoodReviewGrid from "../food-review-grid";
import { foodReview } from "../../types";


export default function FoodListWithControls({ foodList }: { foodList: foodReview[] }) {
  const [sortBy, setSortBy] = useState<"photoName" | "updatedAt">("photoName");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;

  const filteredList = useMemo(
    () => filterAndSort(foodList, sortBy, sortOrder),
    [foodList, sortBy, sortOrder]
  );

  const totalPages = Math.max(1, Math.ceil(filteredList.length / itemsPerPage));
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredList.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="flex flex-col gap-10">
      {/* Sort Controls */}
      <FoodReviewSortControls
        sortBy={sortBy}
        sortOrder={sortOrder}
        onChange={(by, order) => {
          setSortBy(by);
          setSortOrder(order);
          setCurrentPage(1);
        }}
      />

      {/* Grid */}
      <FoodReviewGrid fetchFoodReview={currentItems} />

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
