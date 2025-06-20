export function cn(...classes: (string | false | undefined | null)[]) {
  return classes.filter(Boolean).join(' ');
}

export type Repository = {
  id: number;
  name: string;
  description: string;
  type: 'sources' | 'forks';
  language: string;
  stars: number;
  forks: number;
  url: string;
  highlight?: string;
};

export const getFiltered = (
  data: Repository[],
  repoType: string,
  language: string,
  search: string
) => {
  const searchLower = search.toLowerCase();
  return data.filter((repo) => {
    const matchesType = repoType === 'all' || repo.type === repoType;
    const matchesLang = language === 'all' || repo.language === language;
    const matchesSearch =
      repo.name.toLowerCase().includes(searchLower) ||
      repo.description.toLowerCase().includes(searchLower) ||
      (repo.highlight && repo.highlight.toLowerCase().includes(searchLower));
    return matchesType && matchesLang && matchesSearch;
  });
}; 