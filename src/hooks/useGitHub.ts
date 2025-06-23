import { useQuery } from "@tanstack/react-query";

import { 
  repositoryGateway, 
  userGateway, 
  transformGitHubRepository,
} from "@/services/api";
import { ITEMS_PER_PAGE } from "@/lib/utils";

// Query Keys
export const queryKeys = {
  user: (username: string) => ["github", "user", username] as const,
  repositories: (username: string, page: number) => 
    ["github", "repositories", username, page] as const,
  starred: (username: string, page: number) => 
    ["github", "starred", username, page] as const,
  starredCount: (username: string) => ["github", "starred-count", username] as const,
};

// Hook para buscar dados do usuário
export const useGitHubUser = (username: string) => {
  return useQuery({
    queryKey: queryKeys.user(username),
    queryFn: () => userGateway.getUser(username),
    enabled: !!username,
    staleTime: 1000 * 60 * 10, // 10 minutos
  });
};

// Hook para buscar a contagem de repositórios starred
export const useGitHubStarredCount = (username: string) => {
  return useQuery({
    queryKey: queryKeys.starredCount(username),
    queryFn: () => userGateway.getStarredCount(username),
    enabled: !!username,
    staleTime: 1000 * 60 * 10, // 10 minutos
  });
};

// Hook para buscar repositórios com paginação
export const useGitHubRepositories = (username: string, page: number = 1) => {
  return useQuery({
    queryKey: queryKeys.repositories(username, page),
    queryFn: () => repositoryGateway.getUserRepositories(username, page, ITEMS_PER_PAGE),
    enabled: !!username,
    staleTime: 1000 * 60 * 5, // 5 minutos
  });
};

// Hook para buscar repositórios starred com paginação
export const useGitHubStarred = (username: string, page: number = 1) => {
  return useQuery({
    queryKey: queryKeys.starred(username, page),
    queryFn: () => repositoryGateway.getUserStarredRepositories(username, page, ITEMS_PER_PAGE),
    enabled: !!username,
    staleTime: 1000 * 60 * 5, // 5 minutos
  });
};

// Hook para buscar repositórios transformados (formato da aplicação)
export const useGitHubRepositoriesTransformed = (username: string, page: number = 1) => {
  const { data: rawData, ...query } = useGitHubRepositories(username, page);
  
  return {
    ...query,
    data: rawData ? rawData.map(transformGitHubRepository) : undefined,
  };
};

// Hook para buscar starred transformados (formato da aplicação)
export const useGitHubStarredTransformed = (username: string, page: number = 1) => {
  const { data: rawData, ...query } = useGitHubStarred(username, page);
  
  return {
    ...query,
    data: rawData ? rawData.map(transformGitHubRepository) : undefined,
  };
}; 