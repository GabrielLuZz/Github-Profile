import { create } from 'zustand';

export type TabType = 'repositories' | 'starred';
export type RepoType = 'all' | 'forks' | 'sources';
export type LanguageType = 'all' | 'javascript' | 'typescript' | 'python' | 'c++';

interface ProfileStore {
  selectedTab: TabType;
  setSelectedTab: (tab: TabType) => void;
  search: string;
  setSearch: (search: string) => void;
  repoType: RepoType;
  setRepoType: (type: RepoType) => void;
  language: LanguageType;
  setLanguage: (lang: LanguageType) => void;
}

export const useProfileStore = create<ProfileStore>((set) => ({
  selectedTab: 'repositories',
  setSelectedTab: (tab) => set({ selectedTab: tab }),
  search: '',
  setSearch: (search) => set({ search }),
  repoType: 'all',
  setRepoType: (type) => set({ repoType: type }),
  language: 'all',
  setLanguage: (language) => set({ language }),
})); 