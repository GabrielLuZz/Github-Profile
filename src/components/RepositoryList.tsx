"use client";
import RepositoryCard from "./RepositoryCard";
import { useProfileStore } from "../store/useProfileStore";
import { AnimatePresence, motion, LayoutGroup } from "framer-motion";
import { getFiltered, Repository } from "../lib/utils";

const mockRepositories: Repository[] = [
  {
    id: 1,
    name: "Node / Release",
    description: "Node.js Foundation Release Working Group.",
    type: "sources",
    language: "javascript",
    stars: 1569,
    forks: 142,
    url: "#",
    highlight: "Release",
  },
  {
    id: 2,
    name: "Cordeiro / Angular Choosen",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    type: "sources",
    language: "typescript",
    stars: 726,
    forks: 91,
    url: "#",
    highlight: "Angular Choosen",
  },
  {
    id: 3,
    name: "Teste / App Release 1.03",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisis vel etiam tellus velit pellentesque scelerisque ut risus.",
    type: "forks",
    language: "python",
    stars: 9327,
    forks: 562,
    url: "#",
    highlight: "App Release 1.03",
  },
];

const RepositoryList = () => {
  const search = useProfileStore((s) => s.search);
  const repoType = useProfileStore((s) => s.repoType);
  const language = useProfileStore((s) => s.language);

  const filtered = getFiltered(mockRepositories, repoType, language, search);

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
            Nenhum repositório encontrado.
          </motion.span>
        ) : (
          filtered.map((repo) => (
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
          ))
        )}
      </AnimatePresence>
    </LayoutGroup>
  );
};

export default RepositoryList;
