import { create } from 'zustand';
import { DEFAULT_USERNAME } from '@/lib/utils';

export type TabType = 'repositories' | 'starred';
export type RepoType = 'all' | 'forks' | 'sources';
export type LanguageType = 'all' | 'javascript' | 'typescript' | 'python' | 'c++';

interface ProfileStore {
  // Usuário
  username: string;
  setUsername: (username: string) => void;
  
  // Tabs
  selectedTab: TabType;
  setSelectedTab: (tab: TabType) => void;
  
  // Filtros
  search: string;
  setSearch: (search: string) => void;
  repoType: RepoType;
  setRepoType: (type: RepoType) => void;
  language: LanguageType;
  setLanguage: (lang: LanguageType) => void;
  
  // Paginação
  currentPage: number;
  setCurrentPage: (page: number) => void;
  hasNextPage: boolean;
  setHasNextPage: (hasNext: boolean) => void;
}

export const useProfileStore = create<ProfileStore>((set) => ({
  // Usuário
  username: DEFAULT_USERNAME, // Usuário padrão
  setUsername: (username) => set({ username }),
  
  // Tabs
  selectedTab: 'repositories',
  setSelectedTab: (tab) => set({ selectedTab: tab, currentPage: 1 }), // Reset page ao trocar tab
  
  // Filtros
  search: '',
  setSearch: (search) => set({ search }),
  repoType: 'all',
  setRepoType: (type) => set({ repoType: type }),
  language: 'all',
  setLanguage: (language) => set({ language }),
  
  // Paginação
  currentPage: 1,
  setCurrentPage: (page) => set({ currentPage: page }),
  hasNextPage: false,
  setHasNextPage: (hasNext) => set({ hasNextPage: hasNext }),
})); 