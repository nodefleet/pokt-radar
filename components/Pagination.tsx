import Link from "next/link";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
} from "@heroicons/react/24/outline";

interface IPagination {
  path: string;
  currentPage: number;
  total: number;
  size: number;
  searchParams?: { [key: string]: string | number | undefined };
}

export default function Pagination({
  path,
  searchParams,
  currentPage,
  size,
  total,
}: IPagination) {
  const totalPages = Math.ceil(total / size);
  const pages: number[] = Array.from({ length: totalPages }, (_, i) => i + 1);
  const lastPage: number = pages[pages.length - 1];

  const DISPLAY_PAGES = 5;
  let displayPagesList: number[];
  if (currentPage < DISPLAY_PAGES) {
    displayPagesList = pages.slice(0, DISPLAY_PAGES);
  } else if (currentPage > lastPage - (DISPLAY_PAGES - 1)) {
    displayPagesList = pages.slice(-DISPLAY_PAGES);
  } else {
    displayPagesList = pages.slice(
      currentPage - (DISPLAY_PAGES - 1),
      currentPage + 1
    );
  }

  return (
    <div className="flex items-center text-black space-x-2.5">
      <div className="p-2 bg-gray-100 rounded cursor-pointer">
        <Link href={{ pathname: path, query: { page: 1, ...searchParams } }}>
          <ChevronDoubleLeftIcon className="h-4 w-4 stroke-black hover:stroke-blue_primary" />
        </Link>
      </div>
      <Link
        href={{
          pathname: path,
          query: {
            page: currentPage > 1 ? currentPage - 1 : 1,
            ...searchParams,
          },
        }}
        className="p-2 bg-gray-100 rounded cursor-pointer"
      >
        <ChevronLeftIcon className="h-4 w-4 stroke-black hover:stroke-blue_primary" />
      </Link>
      <div className="btn-group bg-gray-100">
        {displayPagesList.map((pageNumber) => (
          <Link
            key={pageNumber}
            href={{
              pathname: path,
              query: { page: pageNumber, ...searchParams },
            }}
            className={`btn btn-sm border-0 hover:text-blue_primary ${
              pageNumber === currentPage
                ? "font-bold text-blue_primary"
                : "font-normal"
            }`}
          >
            {pageNumber}
          </Link>
        ))}
      </div>
      <Link
        href={{
          pathname: path,
          query: {
            page: currentPage < lastPage ? currentPage + 1 : lastPage,
            ...searchParams,
          },
        }}
        className="p-2 bg-gray-100 rounded cursor-pointer"
      >
        <ChevronRightIcon className="h-4 w-4 stroke-black hover:stroke-blue_primary" />
      </Link>
      <Link
        href={{ pathname: path, query: { page: lastPage, ...searchParams } }}
        className="p-2 bg-gray-100 rounded cursor-pointer"
      >
        <ChevronDoubleRightIcon className="h-4 w-4 stroke-black hover:stroke-blue_primary" />
      </Link>
    </div>
  );
}
