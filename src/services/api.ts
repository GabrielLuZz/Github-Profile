// Adapter HTTP genérico usando fetch
const API_BASE_URL = "https://api.github.com";

interface HttpRequest {
  url: string;
  method: "GET" | "POST" | "PATCH" | "DELETE";
  body?: any;
  headers?: Record<string, string>;
  tag?: string;
}

interface HttpResponse<T = any> {
  status: number;
  data: T;
}

const fetchHttpAdapter = async <T>({
  url,
  method,
  body,
  headers,
  tag,
}: HttpRequest): Promise<HttpResponse<T>> => {
  // Adiciona token de autenticação se disponível
  const authHeaders: Record<string, string> = {};
  
  if (typeof window !== 'undefined') {
    // Client-side: usar localStorage ou sessionStorage
    const token = localStorage.getItem('GITHUB_TOKEN') || sessionStorage.getItem('GITHUB_TOKEN');
    if (token) {
      authHeaders['Authorization'] = `Bearer ${token}`;
    }
  } else {
    // Server-side: usar variável de ambiente
    const token = process.env.GITHUB_TOKEN;
    if (token) {
      authHeaders['Authorization'] = `Bearer ${token}`;
    }
  }

  const response = await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/vnd.github.v3+json",
      ...authHeaders,
      ...(headers || {}),
    },
    body: body ? JSON.stringify(body) : undefined,
    next: tag ? { tags: [tag] } : undefined,
  });

  const data = response.status !== 204 ? await response.json() : undefined;

  // Se a resposta for erro (status >= 400) ou tiver statusCode, lança erro
  if (
    !response.ok ||
    (data && typeof data === "object" && "statusCode" in data)
  ) {
    throw {
      status: response.status,
      ...(typeof data === "object" ? data : { message: response.statusText }),
    };
  }

  return { status: response.status, data };
};

// Types
export interface GitHubRepository {
  id: number;
  name: string;
  full_name: string;
  owner: {
    login: string;
  };
  description: string | null;
  private: boolean;
  fork: boolean;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  html_url: string;
  clone_url: string;
  default_branch: string;
  created_at: string;
  updated_at: string;
  pushed_at: string;
  size: number;
  topics: string[];
  visibility: string;
  archived: boolean;
  disabled: boolean;
  license: {
    key: string;
    name: string;
    url: string;
  } | null;
}

export interface GitHubUser {
  login: string;
  id: number;
  avatar_url: string;
  name: string | null;
  bio: string | null;
  company: string | null;
  location: string | null;
  blog: string | null;
  twitter_username: string | null;
  public_repos: number;
  followers: number;
  following: number;
  created_at: string;
  updated_at: string;
}

// Repository Gateway
interface RepositoryGateway {
  getUserRepositories(username: string, page?: number, perPage?: number): Promise<GitHubRepository[]>;
  getUserStarredRepositories(username: string, page?: number, perPage?: number): Promise<GitHubRepository[]>;
  getRepositoryById(owner: string, repo: string): Promise<GitHubRepository>;
  searchRepositories(query: string, page?: number, perPage?: number): Promise<{
    total_count: number;
    items: GitHubRepository[];
  }>;
}

class GitHubRepositoryGateway implements RepositoryGateway {
  async getUserRepositories(
    username: string, 
    page: number = 1, 
    perPage: number = 10
  ): Promise<GitHubRepository[]> {
    const { data } = await fetchHttpAdapter<GitHubRepository[]>({
      url: `${API_BASE_URL}/users/${username}/repos?page=${page}&per_page=${perPage}&sort=updated`,
      method: "GET",
      tag: `user-${username}-repos`,
    });
    return data;
  }

  async getUserStarredRepositories(
    username: string, 
    page: number = 1, 
    perPage: number = 10
  ): Promise<GitHubRepository[]> {
    const { data } = await fetchHttpAdapter<GitHubRepository[]>({
      url: `${API_BASE_URL}/users/${username}/starred?page=${page}&per_page=${perPage}&sort=updated`,
      method: "GET",
      tag: `user-${username}-starred`,
    });
    return data;
  }

  async getRepositoryById(owner: string, repo: string): Promise<GitHubRepository> {
    const { data } = await fetchHttpAdapter<GitHubRepository>({
      url: `${API_BASE_URL}/repos/${owner}/${repo}`,
      method: "GET",
      tag: `repo-${owner}-${repo}`,
    });
    return data;
  }

  async searchRepositories(
    query: string, 
    page: number = 1, 
    perPage: number = 10
  ): Promise<{
    total_count: number;
    items: GitHubRepository[];
  }> {
    const { data } = await fetchHttpAdapter<{
      total_count: number;
      items: GitHubRepository[];
    }>({
      url: `${API_BASE_URL}/search/repositories?q=${encodeURIComponent(query)}&page=${page}&per_page=${perPage}&sort=updated`,
      method: "GET",
      tag: `search-${query}`,
    });
    return data;
  }
}

// User Gateway
interface UserGateway {
  getUser(username: string): Promise<GitHubUser>;
  getAuthenticatedUser(): Promise<GitHubUser>;
  getStarredCount(username: string): Promise<number>;
}

class GitHubUserGateway implements UserGateway {
  async getUser(username: string): Promise<GitHubUser> {
    const { data } = await fetchHttpAdapter<GitHubUser>({
      url: `${API_BASE_URL}/users/${username}`,
      method: "GET",
      tag: `user-${username}`,
    });
    return data;
  }

  async getAuthenticatedUser(): Promise<GitHubUser> {
    const { data } = await fetchHttpAdapter<GitHubUser>({
      url: `${API_BASE_URL}/user`,
      method: "GET",
      tag: "authenticated-user",
    });
    return data;
  }

  async getStarredCount(username: string): Promise<number> {
    const response = await fetch(
      `${API_BASE_URL}/users/${username}/starred?per_page=1`,
      {
        method: "HEAD",
        headers: {
          Accept: "application/vnd.github.v3+json",
        },
      }
    );

    const linkHeader = response.headers.get("Link");
    if (!linkHeader) {
      // Se não houver header, pode ser que haja 0 ou 1 starred.
      // Vamos fazer um GET para ter certeza.
      const { data } = await fetchHttpAdapter<any[]>({
        url: `${API_BASE_URL}/users/${username}/starred?per_page=1`,
        method: "GET",
      });
      return data.length;
    }

    const lastPageMatch = linkHeader.match(/page=(\d+)>; rel="last"/);
    if (lastPageMatch) {
      return parseInt(lastPageMatch[1], 10);
    }
    
    // Se não houver "last", significa que só há uma página.
    // O número de itens é o que está no header, ou 1 se não houver.
    const repos = await fetchHttpAdapter<any[]>({
        url: `${API_BASE_URL}/users/${username}/starred`,
        method: "GET",
      });
    return repos.data.length
  }
}

// Factory
class GitHubApiGatewayFactory {
  static createRepositoryGateway(): RepositoryGateway {
    return new GitHubRepositoryGateway();
  }

  static createUserGateway(): UserGateway {
    return new GitHubUserGateway();
  }
}

// Instâncias prontas para uso
export const repositoryGateway = GitHubApiGatewayFactory.createRepositoryGateway();
export const userGateway = GitHubApiGatewayFactory.createUserGateway();

// Métodos para configurar autenticação
export const setGitHubToken = (token: string, persist: boolean = true) => {
  if (typeof window !== 'undefined') {
    if (persist) {
      localStorage.setItem('GITHUB_TOKEN', token);
    } else {
      sessionStorage.setItem('GITHUB_TOKEN', token);
    }
  }
};

export const removeGitHubToken = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('GITHUB_TOKEN');
    sessionStorage.removeItem('GITHUB_TOKEN');
  }
};

export const hasGitHubToken = (): boolean => {
  if (typeof window !== 'undefined') {
    return !!(localStorage.getItem('GITHUB_TOKEN') || sessionStorage.getItem('GITHUB_TOKEN'));
  }
  return !!process.env.GITHUB_TOKEN;
};

// Utilitários para transformar dados do GitHub para o formato da aplicação
export const transformGitHubRepository = (githubRepo: GitHubRepository) => {
  // A fonte mais confiável para o proprietário é `owner.login`.
  // A fonte mais confiável para o nome do repo é `name`.
  const owner = githubRepo.owner?.login || githubRepo.full_name?.split('/')[0] || 'unknown';
  const repoName = githubRepo.name;

  return {
    id: githubRepo.id,
    name: owner,
    description: githubRepo.description || "",
    type: githubRepo.fork ? "forks" as const : "sources" as const,
    language: githubRepo.language || "unknown",
    stars: githubRepo.stargazers_count || 0,
    forks: githubRepo.forks_count || 0,
    url: githubRepo.html_url,
    highlight: repoName,
  };
}; 