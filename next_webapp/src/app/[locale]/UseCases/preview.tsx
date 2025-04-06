import React, { useState } from "react";
import { CaseStudy } from "../../types";
import { ChevronLeft, ChevronRight, FileText, ArrowLeft } from "lucide-react";

const ITEMS_PER_PAGE = 6;

interface PreviewComponentProps {
  caseStudies: CaseStudy[];
  selectedCaseStudy: CaseStudy | null;
  onSelectCaseStudy: (study: CaseStudy) => void;
  onBack: () => void;
}

const PreviewComponent: React.FC<PreviewComponentProps> = ({
  caseStudies,
  selectedCaseStudy,
  onSelectCaseStudy,
  onBack,
}) => {
  const [currentPage, setCurrentPage] = useState(1);

  // Detail view if a tile is selected
  if (selectedCaseStudy) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-800 p-8">
        <button
          onClick={onBack}
          className="flex items-center text-green-500 mb-4 hover:text-green-700 transition-colors duration-300"
        >
          <ArrowLeft size={24} className="mr-2" />
          Back
        </button>
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-6 flex-grow overflow-auto">
          <h1 className="text-3xl font-bold mb-4 text-black dark:text-white break-words">
            {selectedCaseStudy.name}
          </h1>
          <iframe
            src={`/api?filename=${selectedCaseStudy.filename}`}
            className="w-full h-[70vh] border-none"
            title={selectedCaseStudy.name}
          />
        </div>
      </div>
    );
  }

  // When no use cases are found, display an appropriate message and hide pagination controls
  if (!caseStudies || caseStudies.length === 0) {
    return (
      <div className="flex flex-col h-full bg-gray-100 dark:bg-gray-800 p-8">
        <div className="text-center mt-8">
          <p className="text-lg text-gray-700 dark:text-gray-300">
            No use cases found.
          </p>
        </div>
      </div>
    );
  }

  const totalPages = Math.ceil(caseStudies.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const visibleCaseStudies = caseStudies.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="flex flex-col h-full bg-gray-100 dark:bg-gray-800 p-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
        {visibleCaseStudies.map((study) => (
          <div
            key={study.id}
            className="bg-white dark:bg-gray-900 p-4 rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-shadow duration-300"
            onClick={() => onSelectCaseStudy(study)}
          >
            <div className="flex items-center justify-center mb-4">
              <FileText size={48} className="text-green-500" />
              <FileText size={48} className="text-teal-400 -ml-6" />
              <FileText size={48} className="text-green-700 -ml-6 rotate-6" />
            </div>
            <h3 className="font-bold text-lg text-center mb-2 text-black dark:text-white break-words">
              {study.name}
            </h3>
            <p className="text-gray-600 dark:text-gray-200 text-center mb-2 break-words">
              {study.description}
            </p>
            <div className="flex flex-wrap justify-center gap-2 dark:text-white">
              <p>Tags: </p>
              {study.tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-sm px-2 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Pagination controls shown only if there is more than one page */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center space-x-4">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="p-2 bg-white dark:bg-gray-900 rounded-full shadow-md disabled:opacity-50 dark:text-white"
          >
            <ChevronLeft size={24} />
          </button>
          <span className="text-xl font-semibold text-black dark:text-white">
            {currentPage}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="p-2 bg-white dark:bg-gray-900 rounded-full shadow-md disabled:opacity-50 dark:text-white"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      )}
    </div>
  );
};

export default PreviewComponent;
