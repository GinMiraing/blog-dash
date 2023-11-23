"use client";

import { useState } from "react";

import { cn } from "@/lib/utils";

import { Button } from "../ui/button";

const Pagination: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalItems = 62;
  const itemsPerPage = 10;

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const pages = [currentPage - 1, currentPage, currentPage + 1].filter(
    (item) => item > 1 && item < totalPages,
  );

  return (
    <div className="flex items-center space-x-2">
      <Button
        disabled={currentPage === 1}
        onClick={() => setCurrentPage(1)}
      >
        1
      </Button>
      <span
        className={cn("inline", {
          hidden: currentPage < 3,
        })}
      >
        ...
      </span>
      {pages.map((page) => (
        <Button
          disabled={currentPage === page}
          key={page}
          onClick={() => setCurrentPage(page)}
        >
          {page}
        </Button>
      ))}
      <span
        className={cn("inline", {
          hidden: currentPage >= totalPages - 1,
        })}
      >
        ...
      </span>
      <Button
        disabled={currentPage === totalPages}
        onClick={() => setCurrentPage(totalPages)}
      >
        {totalPages}
      </Button>
    </div>
  );
};

export default Pagination;
