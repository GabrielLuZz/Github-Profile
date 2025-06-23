"use client";
import RepositoryCard from "./RepositoryCard";
import RepositorySkeletonList from "./RepositorySkeletonList";
import { useProfileStore } from "../store/useProfileStore";
import { useGitHubRepositoriesTransformed } from "../hooks/useGitHub";
import { AnimatePresence, motion, LayoutGroup } from "motion/react";
import { getFiltered, ITEMS_PER_PAGE } from "../lib/utils";
import { useEffect } from "react";

const RepositoryList = () => {
  const username = useProfileStore((s) => s.username);
  const search = useProfileStore((s) => s.search);
  const repoType = useProfileStore((s) => s.repoType);
  const language = useProfileStore((s) => s.language);
  const currentPage = useProfileStore((s) => s.currentPage);
  const setHasNextPage = useProfileStore((s) => s.setHasNextPage);

  const {
    data: repositories = [],
    isLoading,
    error,
    isFetching,
  } = useGitHubRepositoriesTransformed(username, currentPage);

  useEffect(() => {
    setHasNextPage(repositories.length === ITEMS_PER_PAGE);
  }, [repositories.length, setHasNextPage]);

  const filtered = getFiltered(repositories, repoType, language, search);

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-red-500 text-center py-8"
      >
        Erro ao carregar repositórios: {error.message}
      </motion.div>
    );
  }

  if (isLoading) {
    return <RepositorySkeletonList count={6} />;
  }

  return (
    <LayoutGroup>
      <AnimatePresence initial={false}>
        {filtered.length === 0 ? (
          <motion.span
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-app-gray text-sm"
            layout
          >
            {search || repoType !== 'all' || language !== 'all' 
              ? "Nenhum repositório encontrado com os filtros aplicados."
              : "Nenhum repositório encontrado."
            }
          </motion.span>
        ) : (
          <>
            {filtered.map((repo) => (
              <motion.div
                key={repo.id}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 24 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                layout
              >
                <RepositoryCard repo={repo} />
              </motion.div>
            ))}
            
            {isFetching && !isLoading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-app-gray text-sm text-center py-4"
              >
                Atualizando...
              </motion.div>
            )}
          </>
        )}
      </AnimatePresence>
    </LayoutGroup>
  );
};

export default RepositoryList;
