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

  const DIPLAY_PAGES = 5;
  let displayPagesList;
  if (currentPage < DIPLAY_PAGES) {
    displayPagesList = pages.slice(0, DIPLAY_PAGES);
  } else if (currentPage > lastPage - (DIPLAY_PAGES - 1)) {
    displayPagesList = pages.slice(DIPLAY_PAGES * -1);
  } else {
    displayPagesList = pages.slice(
      currentPage - (DIPLAY_PAGES - 1),
      currentPage + 1
    );
  }
  return (
    <div className="flex items-center text-dark-brown space-x-2.5">
      <div className="p-2 bg-gray-10 rounded cursor-pointer">
        <Link
          href={{
            pathname: path,
            query: { page: 1, ...searchParams },
          }}
        >
          <ChevronDoubleLeftIcon className="h-4 w-4" />
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
      >
        <div className="p-2 bg-gray-10 rounded cursor-pointer">
          <ChevronLeftIcon className="h-4 w-4" />
        </div>
      </Link>
      <div className="btn-group bg-gray-10">
        {displayPagesList.map((pageNumber) => (
          <Link
            key={pageNumber}
            href={{
              pathname: path,
              query: {
                page: pageNumber,
                ...searchParams,
              },
            }}
          >
            <button
              className={`btn btn-sm border-0 ${
                pageNumber === currentPage ? "font-bold" : "font-normal"
              }`}
            >
              {pageNumber}
            </button>
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
      >
        <div className="p-2 bg-gray-10 rounded cursor-pointer">
          <ChevronRightIcon className="h-4 w-4" />
        </div>
      </Link>
      <Link
        href={{
          pathname: path,
          query: { page: lastPage, ...searchParams },
        }}
      >
        <div className="p-2 bg-gray-10 rounded cursor-pointer">
          <ChevronDoubleRightIcon className="h-4 w-4" />
        </div>
      </Link>
    </div>
  );
}
