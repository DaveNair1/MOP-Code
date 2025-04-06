"use client";
import React, { useState, useEffect } from "react";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import SearchBar from "./searchbar";
import PreviewComponent from "./preview";
import { CATEGORY, SEARCH_MODE, SearchParams, CaseStudy } from "../../types";
import { useTranslations } from "next-intl";

async function searchUseCases(searchParams: SearchParams) {
  const response = await fetch("/api/search-use-cases", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(searchParams),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return await response.json();
}

const UseCases = () => {
  const [filteredCaseStudies, setFilteredCaseStudies] = useState<CaseStudy[]>(
    []
  );
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<CaseStudy | null>(
    null
  );
  const t = useTranslations("usecases");

  useEffect(() => {
    handleSearch("", SEARCH_MODE.TITLE, CATEGORY.ALL);
  }, []);

  const handleSearch = async (
    searchTerm: string,
    searchMode: SEARCH_MODE,
    category: CATEGORY
  ) => {
    try {
      const res = await searchUseCases({ searchTerm, searchMode, category });
      setFilteredCaseStudies(res?.filteredStudies);
    } catch (error) {
      console.error("Error fetching use cases:", error);
      setFilteredCaseStudies([]);
    }
  };

  return (
    <div className="flex flex-col min-h-screen font-sans bg-gray-200 dark:bg-gray-800">
      <Header />
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 lg:px-10">
          <section className="py-5">
            <p>
              <span className="text-4xl font-bold text-black dark:text-white">
                {t("Use Cases")}
              </span>
            </p>
            {/* Hide search bar when a tile is selected */}
            {!selectedCaseStudy && <SearchBar onSearch={handleSearch} />}
            <PreviewComponent
              caseStudies={filteredCaseStudies}
              selectedCaseStudy={selectedCaseStudy}
              onSelectCaseStudy={(study: CaseStudy) =>
                setSelectedCaseStudy(study)
              }
              onBack={() => setSelectedCaseStudy(null)}
            />
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default UseCases;
