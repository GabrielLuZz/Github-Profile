import RepositorySkeleton from "./RepositorySkeleton";

interface RepositorySkeletonListProps {
  count?: number;
}

const RepositorySkeletonList = ({ count = 6 }: RepositorySkeletonListProps) => {
  return (
    <div className="flex flex-col gap-4">
      {Array.from({ length: count }).map((_, index) => (
        <RepositorySkeleton key={index} />
      ))}
    </div>
  );
};

export default RepositorySkeletonList; 