"use client";
import { useState, useEffect } from "react";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
} from "@heroicons/react/24/outline";

export default function ClientPagination({
  data,
  setRows,
  perPage,
}: {
  data: any[];
  setRows: CallableFunction;
  perPage: number;
}) {
  const totalPages = Math.ceil(data.length / perPage);
  const [pages, setPages] = useState<number[]>([]);
  const lastPage: number = pages[pages.length - 1];

  const [currentPage, setCurrentPage] = useState(1);
  const [displayPagesList, setDisplayPagesList] = useState<number[]>([]);

  const DIPLAY_PAGES = 5;

  useEffect(() => {
    setPages(Array.from({ length: totalPages }, (_, i) => i + 1));
  }, [setPages, data, totalPages]);

  useEffect(() => {
    if (currentPage < DIPLAY_PAGES) {
      setDisplayPagesList(pages.slice(0, DIPLAY_PAGES));
    } else if (currentPage > lastPage - (DIPLAY_PAGES - 1)) {
      setDisplayPagesList(pages.slice(DIPLAY_PAGES * -1));
    } else {
      setDisplayPagesList(
        pages.slice(currentPage - (DIPLAY_PAGES - 1), currentPage + 1)
      );
    }
  }, [currentPage, pages, lastPage, setDisplayPagesList]);

  useEffect(() => {
    setRows(data.slice((currentPage - 1) * perPage, currentPage * perPage));
  }, [data, currentPage, perPage, setRows]);

  return (
    <div className="flex items-center text-dark-brown space-x-2.5">
      <div
        className="p-2 bg-gray-10 rounded cursor-pointer"
        onClick={() => setCurrentPage(1)}
      >
        <ChevronDoubleLeftIcon className="h-4 w-4" />
      </div>

      <div
        className="p-2 bg-gray-10 rounded cursor-pointer"
        onClick={() => currentPage > 1 && setCurrentPage((prev) => prev - 1)}
      >
        <ChevronLeftIcon className="h-4 w-4" />
      </div>

      <div className="btn-group bg-gray-10">
        {displayPagesList.map((pageNumber) => (
          <button
            key={pageNumber}
            onClick={() => setCurrentPage(pageNumber)}
            className={`btn btn-sm border-0 ${
              pageNumber === currentPage ? "font-bold" : "font-normal"
            }`}
          >
            {pageNumber}
          </button>
        ))}
      </div>

      <div
        className="p-2 bg-gray-10 rounded cursor-pointer"
        onClick={() =>
          currentPage < lastPage && setCurrentPage((prev) => prev + 1)
        }
      >
        <ChevronRightIcon className="h-4 w-4" />
      </div>

      <div
        className="p-2 bg-gray-10 rounded cursor-pointer"
        onClick={() => setCurrentPage(lastPage)}
      >
        <ChevronDoubleRightIcon className="h-4 w-4" />
      </div>
    </div>
  );
}
