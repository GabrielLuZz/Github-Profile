"use client";
import { useProfileStore } from "../store/useProfileStore";
import { motion } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Pagination = () => {
  const currentPage = useProfileStore((s) => s.currentPage);
  const hasNextPage = useProfileStore((s) => s.hasNextPage);
  const setCurrentPage = useProfileStore((s) => s.setCurrentPage);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (hasNextPage) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center justify-center gap-4 md:gap-6 mt-8"
    >
      <button
        onClick={handlePreviousPage}
        disabled={currentPage === 1}
        className={`
          flex items-center gap-2 px-3 md:px-4 py-2 rounded-lg border transition-colors
          group focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-app-primary
          ${
            currentPage === 1
              ? "border-app-gray-400 text-app-gray-500 bg-app-gray-200 cursor-not-allowed"
              : "border-app-primary text-app-primary hover:bg-app-primary hover:text-white"
          }
        `}
        tabIndex={currentPage === 1 ? -1 : 0}
        aria-disabled={currentPage === 1}
        aria-label="Página anterior"
      >
        <ChevronLeft size={16} />
        <span className="hidden md:inline">Anterior</span>
      </button>

      <span className="text-app-gray-600 font-medium text-sm">
        Página {currentPage}
      </span>

      <button
        onClick={handleNextPage}
        disabled={!hasNextPage}
        className={`
          flex items-center gap-2 px-3 md:px-4 py-2 rounded-lg border transition-colors
          group focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-app-primary
          ${
            !hasNextPage
              ? "border-app-gray-400 text-app-gray-500 bg-app-gray-200 cursor-not-allowed"
              : "border-app-primary text-app-primary hover:bg-app-primary hover:text-white"
          }
        `}
        tabIndex={!hasNextPage ? -1 : 0}
        aria-disabled={!hasNextPage}
        aria-label="Próxima página"
      >
        <span className="hidden md:inline">Próxima</span>
        <ChevronRight size={16} />
      </button>
    </motion.div>
  );
};

export default Pagination; 