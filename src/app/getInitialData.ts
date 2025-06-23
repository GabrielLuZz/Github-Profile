import { userGateway, repositoryGateway } from "@/services/api";
import { queryKeys } from "@/hooks/useGitHub";
import { ITEMS_PER_PAGE, DEFAULT_USERNAME } from "@/lib/utils";

export async function getInitialData() {
  try {
    const user = await userGateway.getUser(DEFAULT_USERNAME);
    const repositories = await repositoryGateway.getUserRepositories(
      DEFAULT_USERNAME,
      1,
      ITEMS_PER_PAGE
    );
    const starred = await repositoryGateway.getUserStarredRepositories(
      DEFAULT_USERNAME,
      1,
      ITEMS_PER_PAGE
    );

    return {
      user: {
        queryKey: queryKeys.user(DEFAULT_USERNAME),
        data: user,
      },
      repositories: {
        queryKey: queryKeys.repositories(DEFAULT_USERNAME, 1),
        data: repositories,
      },
      starred: {
        queryKey: queryKeys.starred(DEFAULT_USERNAME, 1),
        data: starred,
      },
    };
  } catch (error) {
    console.error("Erro ao buscar dados iniciais:", error);
    return {
      user: {
        queryKey: queryKeys.user(DEFAULT_USERNAME),
        data: null,
      },
      repositories: {
        queryKey: queryKeys.repositories(DEFAULT_USERNAME, 1),
        data: [],
      },
      starred: {
        queryKey: queryKeys.starred(DEFAULT_USERNAME, 1),
        data: [],
      },
    };
  }
} 