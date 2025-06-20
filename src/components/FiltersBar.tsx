"use client";
import * as Select from "@radix-ui/react-select";
import { useProfileStore } from "../store/useProfileStore";
import { useState } from "react";
import ModalFilter from "./ModalFilter";

const typeOptions = [
  { value: "all", label: "Type" },
  { value: "sources", label: "Sources" },
  { value: "forks", label: "Forks" },
];

const languageOptions = [
  { value: "all", label: "Language" },
  { value: "javascript", label: "JavaScript" },
  { value: "typescript", label: "TypeScript" },
  { value: "python", label: "Python" },
  { value: "c++", label: "C++" },
];

const FiltersBar = () => {
  const repoType = useProfileStore((s) => s.repoType);
  const setRepoType = useProfileStore((s) => s.setRepoType);
  const language = useProfileStore((s) => s.language);
  const setLanguage = useProfileStore((s) => s.setLanguage);
  const search = useProfileStore((s) => s.search);
  const setSearch = useProfileStore((s) => s.setSearch);
  const [modal, setModal] = useState<"type" | "language" | null>(null);

  const handleModalClose = () => {
    setModal(null);
  };

  const filterButtonClass = (active: boolean) =>
    active
      ? "bg-gradient-to-r from-app-primary-dark to-app-primary text-app-white border-app-primary border-2"
      : "bg-transparent text-app-primary border-app-primary border-2";

  const selectedTypeOption = typeOptions.find((o) => o.value === repoType);

  const selectedLanguageOption = languageOptions.find(
    (o) => o.value === language
  );

  return (
    <div className="flex flex-col sm:flex-row-reverse sm:justify-end gap-4 w-full items-center">
      {/* Filtro Language */}
      <div className="sm:hidden w-full">
        <button
          className={`filter-trigger ${filterButtonClass(language !== "all")}`}
          onClick={() => setModal("language")}
          aria-label="Filtrar por linguagem"
        >
          {selectedLanguageOption?.label}
        </button>
        <ModalFilter
          open={modal === "language"}
          title="Language"
          options={languageOptions}
          selected={language}
          onSelect={(v) => {
            setLanguage(v as typeof language);
            handleModalClose();
          }}
          onClose={() => handleModalClose()}
        />
      </div>
      <div className="hidden sm:block">
        <Select.Root value={language} onValueChange={setLanguage}>
          <Select.Trigger
            className={`filter-trigger ${filterButtonClass(
              language !== "all"
            )}`}
            aria-label="Filtrar por linguagem"
          >
            <Select.Value>
              {languageOptions.find((o) => o.value === language)?.label}
            </Select.Value>
          </Select.Trigger>
          <Select.Content className="bg-app-white border border-app-border rounded-md">
            {languageOptions.map((option) => (
              <Select.Item
                key={option.value}
                value={option.value}
                className="px-4 py-2 text-sm cursor-pointer hover:bg-app-primary/10 focus:bg-app-primary/10 outline-none text-app-gray transition-colors duration-200"
              >
                <Select.ItemText>{option.label}</Select.ItemText>
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Root>
      </div>
      {/* Filtro Type */}
      <div className="sm:hidden w-full">
        <button
          className={`filter-trigger ${filterButtonClass(repoType !== "all")}`}
          onClick={() => setModal("type")}
          aria-label="Filtrar por tipo"
        >
          {typeOptions.find((o) => o.value === repoType)?.label}
        </button>
        <ModalFilter
          open={modal === "type"}
          title="Type"
          options={typeOptions}
          selected={repoType}
          onSelect={(v) => {
            setRepoType(v as typeof repoType);
            handleModalClose();
          }}
          onClose={() => handleModalClose()}
        />
      </div>
      <div className="hidden sm:block">
        <Select.Root value={repoType} onValueChange={setRepoType}>
          <Select.Trigger
            className={`filter-trigger ${filterButtonClass(
              repoType !== "all"
            )}`}
            aria-label="Filtrar por tipo"
          >
            <Select.Value>{selectedTypeOption?.label}</Select.Value>
          </Select.Trigger>
          <Select.Content className="bg-app-white border border-app-border rounded-md">
            {typeOptions.map((option) => (
              <Select.Item
                key={option.value}
                value={option.value}
                className="px-4 py-2 text-sm cursor-pointer hover:bg-app-primary/10 focus:bg-app-primary/10 outline-none text-app-gray transition-colors duration-200"
              >
                <Select.ItemText>
                  {option.value === "all" ? "All" : option.label}
                </Select.ItemText>
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Root>
      </div>
      {/* Campo de busca com ícone de lupa */}
      <div className="relative flex-1 w-full max-w-[27.75rem]">
        <span className="absolute left-0 top-1/2 -translate-y-1/2 text-app-gray pointer-events-none">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z"
              stroke="#989898"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M21 21L16.65 16.65"
              stroke="#989898"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </span>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search Here"
          className="w-full border-0 border-b border-app-border pr-4 py-2 pl-8 text-sm focus:outline-none focus:ring-0 bg-transparent text-app-gray transition-colors duration-200"
          aria-label="Buscar repositórios"
        />
      </div>
    </div>
  );
};

export default FiltersBar;
