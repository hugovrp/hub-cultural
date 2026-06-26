import { useState } from "react";

interface PaginationProps {
  totalPages: number,
  currentMaterials: number[],
}

export default function Pagination( {totalPages, currentMaterials} : PaginationProps ) {
  const [currentPage, setCurrentPage] = useState(1);

  return(
    <div className="mt-10 flex items-center justify-center gap-2">
      <button
        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
        disabled={currentPage === 1}
        className="flex h-10 w-10 items-center justify-center rounded-lg border border-light-gray2 text-lg font-semibold transition 
                    hover:bg-light-blue1/60 disabled:opacity-50"
      >
        ‹
      </button>

      {Array.from({ length: totalPages }).map((_, index) => {
        const page = index + 1;

        return (
          <button
            key={page}
            onClick={() => {
              setCurrentPage(page);

              window.scrollTo({
                top: 0,
                behavior: "smooth",
              });
            }}
            className={`
              flex h-10 w-10 items-center justify-center rounded-lg text-sm font-semibold transition
              ${
                currentPage === page
                  ? "bg-blue1 text-background shadow-md"
                  : "border border-light-gray2 hover:bg-light-blue1/60"
              }
            `}
          >
            {page}
          </button>
        );
      })}

      <button
        onClick={() =>
          setCurrentPage((prev) => Math.min(prev + 1, totalPages))
        }
        className="flex h-10 w-10 items-center justify-center rounded-lg border border-light-gray2 text-lg font-semibold transition hover:bg-light-blue1/60 disabled:opacity-50"
        disabled={currentPage === totalPages || currentMaterials.length === 0}
      >
        ›
      </button>
    </div>
  );
}