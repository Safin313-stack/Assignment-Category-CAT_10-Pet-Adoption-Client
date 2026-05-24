import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import axiosInstance from "../../utils/axios";
import PetCard from "../../components/pets/PetCard";
import LoadingSpinner from "../../components/shared/LoadingSpinner";
import { FiSearch, FiFilter, FiRefreshCw } from "react-icons/fi";

const SPECIES = ["all", "Dog", "Cat", "Bird", "Rabbit", "Fish", "Hamster"];
const SORT_OPTIONS = [
  { value: "newest", label: "Newest First" },
  { value: "price_asc", label: "Price: Low to High" },
  { value: "price_desc", label: "Price: High to Low" },
  { value: "name_asc", label: "Name: A-Z" },
];

const AllPets = () => {
  const [search, setSearch] = useState("");
  const [species, setSpecies] = useState("all");
  const [sort, setSort] = useState("newest");
  const [searchInput, setSearchInput] = useState("");

  const { data: pets = [], isLoading } = useQuery({
    queryKey: ["allPets", search, species, sort],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (search) params.append("search", search);
      if (species !== "all") params.append("species", species);
      if (sort) params.append("sort", sort);
      const res = await axiosInstance.get(`/pets?${params}`);
      return res.data;
    },
  });

  const handleSearch = (e) => {
    e.preventDefault();
    setSearch(searchInput);
  };

  const handleReset = () => {
    setSearchInput("");
    setSearch("");
    setSpecies("all");
    setSort("newest");
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 dark:from-gray-900 dark:to-gray-800 py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="section-title mb-3"
          >
            All Available Pets 🐾
          </motion.h1>
          <p className="text-gray-500 dark:text-gray-400 mb-8">
            Browse and find your perfect companion
          </p>

          {/* Search */}
          <form
            onSubmit={handleSearch}
            className="flex max-w-lg mx-auto gap-2"
          >
            <div className="relative flex-1">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Search by name..."
                className="input-field pl-10"
              />
            </div>
            <button type="submit" className="btn-primary">
              Search
            </button>
          </form>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3 mb-8 bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
          <FiFilter className="text-gray-500 dark:text-gray-400" />

          {/* Species Filter */}
          <div className="flex flex-wrap gap-2">
            {SPECIES.map((s) => (
              <button
                key={s}
                onClick={() => setSpecies(s)}
                className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all ${
                  species === s
                    ? "bg-primary-500 text-white shadow-md"
                    : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                }`}
              >
                {s === "all" ? "All" : s}
              </button>
            ))}
          </div>

          <div className="ml-auto flex items-center gap-3">
            {/* Sort */}
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="input-field py-1.5 text-sm w-48"
            >
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>

            {/* Reset */}
            <button
              onClick={handleReset}
              className="flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
            >
              <FiRefreshCw size={14} /> Reset
            </button>
          </div>
        </div>

        {/* Results count */}
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
          Showing <span className="font-bold text-gray-800 dark:text-gray-200">{pets.length}</span> pets
        </p>

        {/* Pet Grid */}
        {isLoading ? (
          <LoadingSpinner />
        ) : pets.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="text-7xl mb-4">🐾</div>
            <h3 className="text-xl font-display font-bold text-gray-700 dark:text-gray-300 mb-2">
              No pets found
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              Try adjusting your search or filters
            </p>
            <button onClick={handleReset} className="btn-primary mt-4">
              Clear Filters
            </button>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {pets.map((pet, i) => (
              <PetCard key={pet._id} pet={pet} index={i} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllPets;
// allpets
