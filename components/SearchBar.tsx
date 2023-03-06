export default function SearchBar() {
  return (
    <div className="flex w-full justify-center">
      <div className="form-control">
        <div className="input-group">
          <input
            type="text"
            placeholder="Search by Address, Txn Hash, Block Height..."
            className="input input-bordered bg-white min-w-[600px]"
          />
          <button className="btn btn-square bg-dark-brown">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
