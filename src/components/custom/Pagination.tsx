"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";
import { Route } from "next";
import React from "react";
import { cn } from "@/lib/utils";

export interface NavigatorProps {
  currentPage: number;
  totalPages: number;
}

export default function Navigator({ currentPage, totalPages }: NavigatorProps) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const getPages = (): (number | "ellipsis")[] => {
    const pages: (number | "ellipsis")[] = [];

    // Case 1: First 5 pages
    if (currentPage <= 5) {
      for (let i = 1; i <= Math.min(5, totalPages); i++) {
        pages.push(i);
      }
      if (totalPages > 5) {
        pages.push("ellipsis", totalPages);
      }
      return pages;
    }

    // Case 2: Last 5 pages
    if (currentPage >= totalPages - 4) {
      pages.push(1, "ellipsis");
      for (let i = totalPages - 4; i <= totalPages; i++) {
        pages.push(i);
      }
      return pages;
    }

    // Case 3: Middle pages
    pages.push(
      1,
      "ellipsis",
      currentPage - 1,
      currentPage,
      currentPage + 1,
      "ellipsis",
      totalPages,
    );

    return pages;
  };

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams);

    if (page === 1) {
      params.delete("page");
    } else {
      params.set("page", page.toString());
    }

    router.replace(`${pathname}?${params.toString()}` as Route);
  };

  const pages = getPages();

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            disabled={currentPage <= 1}
            onClick={() => handlePageChange(currentPage - 1)}
          />
        </PaginationItem>

        {pages.map((page, i) =>
          page === "ellipsis" ? (
            <PaginationItem key={i}>
              <PaginationEllipsis />
            </PaginationItem>
          ) : (
            <PaginationItem key={i}>
              <PaginationLink
                className={cn({ "text-primary": currentPage === page })}
                onClick={() => handlePageChange(page)}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          ),
        )}

        <PaginationItem>
          <PaginationNext
            disabled={currentPage >= totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
