"use client";
import StarredRepositoryCard from "./StarredRepositoryCard";
import { useProfileStore } from "../store/useProfileStore";
import { AnimatePresence, motion, LayoutGroup } from "framer-motion";
import { getFiltered, Repository } from "../lib/utils";

const mockStarred: Repository[] = [
  {
    id: 101,
    name: "Chamber 5.6.2 / Smite and Ignite",
    description: "Node.js Foundation Release Working Group.",
    type: "sources",
    language: "c++",
    stars: 526,
    forks: 0,
    url: "#",
    highlight: "Smite and Ignite",
  },
  {
    id: 102,
    name: "BNB / Vandal",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    type: "forks",
    language: "python",
    stars: 0,
    forks: 0,
    url: "#",
    highlight: "Vandal",
  },
  {
    id: 103,
    name: "Ilikatsri / Operator",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisis vel etiam tellus velit pellentesque ut risus.",
    type: "sources",
    language: "javascript",
    stars: 312,
    forks: 0,
    url: "#",
    highlight: "Operator",
  },
];

const StarredRepositoryList = () => {
  const search = useProfileStore((s) => s.search);
  const repoType = useProfileStore((s) => s.repoType);
  const language = useProfileStore((s) => s.language);

  const filtered = getFiltered(mockStarred, repoType, language, search);

  return (
    <LayoutGroup>
      <AnimatePresence initial={false}>
        {filtered.length === 0 ? (
          <motion.span
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-zinc-400 text-sm"
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
              <StarredRepositoryCard repo={repo} />
            </motion.div>
          ))
        )}
      </AnimatePresence>
    </LayoutGroup>
  );
};

export default StarredRepositoryList;
