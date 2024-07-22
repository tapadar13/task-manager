import { useState } from "react";

const SearchAndFilter = ({ onSearch, onSort }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("recent");

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    onSearch(term);
  };

  const handleSort = (e) => {
    const option = e.target.value;
    setSortOption(option);
    onSort(option);
  };

  return (
    <div className="bg-white p-4 rounded shadow mb-4">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <div className="w-full md:w-1/2 mb-2 md:mb-0">
          <label htmlFor="search" className="mr-2">
            Search:
          </label>
          <input
            id="search"
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearch}
            className="border rounded p-1 w-full md:w-64"
          />
        </div>
        <div>
          <label htmlFor="sort" className="mr-2">
            Sort By:
          </label>
          <select
            id="sort"
            value={sortOption}
            onChange={handleSort}
            className="border rounded p-1"
          >
            <option value="recent">Recent</option>
            <option value="oldest">Oldest</option>
            <option value="a-z">A-Z</option>
            <option value="z-a">Z-A</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default SearchAndFilter;
