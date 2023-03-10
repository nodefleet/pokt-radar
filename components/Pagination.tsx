import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
} from "@heroicons/react/24/outline";

interface IPagination {
  total: number;
  size: number;
}

export default function Pagination() {
  return (
    <div className="flex items-center text-dark-brown space-x-2.5">
      <div className="p-2 bg-gray-10 rounded cursor-pointer">
        <ChevronDoubleLeftIcon className="h-4 w-4" />
      </div>
      <div className="p-2 bg-gray-10 rounded cursor-pointer">
        <ChevronLeftIcon className="h-4 w-4" />
      </div>
      <div className="btn-group bg-gray-10">
        <button className="btn btn-sm border-0">1</button>
        <button className="btn btn-sm border-0 btn-active">2</button>
        <button className="btn btn-sm border-0">3</button>
        <button className="btn btn-sm border-0">4</button>
        <button className="btn btn-sm border-0">5</button>
      </div>
      <div className="p-2 bg-gray-10 rounded cursor-pointer">
        <ChevronRightIcon className="h-4 w-4" />
      </div>
      <div className="p-2 bg-gray-10 rounded cursor-pointer">
        <ChevronDoubleRightIcon className="h-4 w-4" />
      </div>
    </div>
  );
}
