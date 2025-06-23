import * as motion from "motion/react-client";

const RepositorySkeleton = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 24 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="bg-transparent flex flex-col gap-2 p-4"
    >
      <div className="flex items-center gap-2">
        <div className="h-5 bg-app-gray-300 rounded animate-pulse w-1/4" />
        <div className="h-5 w-px bg-app-gray-300" />
        <div className="h-5 bg-app-gray-300 rounded animate-pulse w-1/3" />
      </div>

      <div className="flex flex-col gap-1.5">
        <div className="h-4 bg-app-gray-300 rounded animate-pulse w-full" />
        <div className="h-4 bg-app-gray-300 rounded animate-pulse w-2/3" />
      </div>

      <div className="flex items-center gap-8 mt-2">
        <div className="flex items-center gap-1">
          <div className="w-4 h-4 bg-app-gray-300 rounded animate-pulse" />
          <div className="h-4 w-8 bg-app-gray-300 rounded animate-pulse" />
        </div>
        <div className="flex items-center gap-1">
          <div className="w-4 h-4 bg-app-gray-300 rounded animate-pulse" />
          <div className="h-4 w-8 bg-app-gray-300 rounded animate-pulse" />
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 bg-app-gray-300 rounded-full animate-pulse" />
          <div className="h-4 w-16 bg-app-gray-300 rounded animate-pulse" />
        </div>
      </div>
    </motion.div>
  );
};

export default RepositorySkeleton; 