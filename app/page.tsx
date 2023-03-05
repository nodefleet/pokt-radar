import SearchBar from "@/components/SearchBar";
import Stats from "@/components/Stats";

export default function Home() {
  return (
    <main>
      <h1>The Honeycomb Explorer</h1>
      <SearchBar />
      <Stats />
      {/* <div>
        <div>
          <h6>Latest blocks</h6>
          <table className="table">
            <thead>
              <th></th>
            </thead>
          </table>
        </div>
        <div>
          <h6>Latest transactions</h6>
          <table className="table">
            <thead>
              <th></th>
            </thead>
          </table>
        </div>
      </div> */}
    </main>
  );
}
