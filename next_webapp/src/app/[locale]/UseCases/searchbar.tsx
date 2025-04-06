import { useState } from "react";
import { CATEGORY, SEARCH_MODE } from "../../types";
import { useTranslations } from "next-intl";

const SearchBar = ({
  onSearch,
}: {
  onSearch: (
    searchTerm: string,
    searchMode: SEARCH_MODE,
    category: CATEGORY
  ) => void;
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState(CATEGORY.ALL);
  const [searchMode, setSearchMode] = useState(SEARCH_MODE.TITLE);

  const t = useTranslations("usecases");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchTerm, searchMode, category);
  };

  return (
    <div className="p-4">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col md:flex-row md:items-center md:space-x-3"
      >
        {/* Search input always on top in mobile view */}
        <div className="flex-grow mb-4 md:mb-0">
          <input
            type="search"
            placeholder={t("Case study name or category")}
            className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-green-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        {/* Filters container will stack on mobile and inline on larger screens */}
        <div className="flex flex-col md:flex-row items-center space-y-3 md:space-y-0 md:space-x-3">
          <select
            id="category-select"
            className="w-full md:w-auto text-black border-2 border-gray-300 px-4 py-2 focus:outline-none focus:border-green-500 rounded-lg dark:bg-gray-700 dark:text-white dark:border-gray-600"
            value={searchMode}
            onChange={(e) => setSearchMode(e.target.value as SEARCH_MODE)}
          >
            <option value={SEARCH_MODE.TITLE}>{t("Search by title")}</option>
            <option value={SEARCH_MODE.CONTENT}>{t("Search by tag")}</option>
          </select>
          <button
            type="submit"
            className="w-full md:w-auto px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none dark:bg-green-800 dark:hover:bg-green-600"
          >
            {t("Search")}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
