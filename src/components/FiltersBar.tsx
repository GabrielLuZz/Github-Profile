"use client";
import * as Select from "@radix-ui/react-select";
import { useProfileStore } from "../store/useProfileStore";
import { useState } from "react";
import ModalFilter from "./ModalFilter";
import { ChevronDown } from "lucide-react";

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
  const [openType, setOpenType] = useState(false);
  const [openLang, setOpenLang] = useState(false);

  const handleModalClose = () => {
    setModal(null);
  };

  const selectedTypeOption = typeOptions.find((o) => o.value === repoType);

  const selectedLanguageOption = languageOptions.find(
    (o) => o.value === language
  );

  return (
    <div className="w-full items-center flex flex-row-reverse gap-2 overflow-hidden bg-app-gray-300 py-3 px-2 rounded-lg sm:gap-4 sm:overflow-visible sm:flex-col-reverse sm:items-start lg:flex-row lg:items-center sm:bg-transparent sm:py-0 sm:px-0 sm:rounded-none">
      {/* Campo de busca com ícone de lupa */}
      <div className="relative sm:flex-1 sm:w-full lg:max-w-[27.75rem] sm:min-w-36">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search Here"
          className=" peer h-10 w-10 bg-transparent pl-10 pr-4 text-sm text-app-gray border-app-border transition-all duration-200 focus:w-[calc(100vw-5rem)] max-w-full focus:pl-10 focus:pr-4 focus:outline-none focus:border-b focus:placeholder-app-gray sm:hidden"
          tabIndex={0}
          aria-label="Buscar repositórios"
        />

        <span className="absolute right-0 top-1/2 -translate-y-1/2 text-app-gray pointer-events-none z-1 peer-focus:right-auto peer-focus:left-0 sm:right-auto sm:left-0">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z"
              className="stroke-app-primary sm:stroke-app-gray"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M21 21L16.65 16.65"
              className="stroke-app-primary sm:stroke-app-gray"
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
          className="hidden w-full border-0 border-b border-app-border pr-4 py-2 pl-8 text-sm focus:outline-none focus:ring-0 bg-transparent text-app-gray transition-colors duration-200 sm:block"
          aria-label="Buscar repositórios"
        />
      </div>
      <div className="flex gap-2 sm:gap-4 flex-1 flex-shrink peer-focus:hidden">
        {/* Filtro Type */}
        <div className="sm:hidden ">
          <button
            className={`filter-trigger`}
            onClick={() => setModal("type")}
            aria-label="Filtrar por tipo"
            tabIndex={0}
          >
            <span
              className={`transition-transform duration-200 ${
                modal === "type" ? "rotate-180" : ""
              }`}
            >
              <ChevronDown size={18} />
            </span>
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
        <div className="hidden sm:block order-2">
          <Select.Root
            value={repoType}
            onValueChange={setRepoType}
            open={openType}
            onOpenChange={setOpenType}
          >
            <Select.Trigger
              className={`filter-trigger`}
              aria-label="Filtrar por tipo"
              tabIndex={0}
            >
              <span
                className={`transition-transform duration-200 ${
                  openType ? "rotate-180" : ""
                }`}
              >
                <ChevronDown size={18} />
              </span>
              {selectedTypeOption?.label}
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
        {/* Filtro Language */}
        <div className="sm:hidden ">
          <button
            className={`filter-trigger`}
            onClick={() => setModal("language")}
            aria-label="Filtrar por linguagem"
            tabIndex={0}
          >
            <span
              className={`transition-transform duration-200 ${
                modal === "language" ? "rotate-180" : ""
              }`}
            >
              <ChevronDown size={18} />
            </span>
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
        <div className="hidden sm:block order-3">
          <Select.Root
            value={language}
            onValueChange={setLanguage}
            open={openLang}
            onOpenChange={setOpenLang}
          >
            <Select.Trigger
              className={`filter-trigger`}
              aria-label="Filtrar por linguagem"
              tabIndex={0}
            >
              <span
                className={`transition-transform duration-200 ${
                  openLang ? "rotate-180" : ""
                }`}
              >
                <ChevronDown size={18} />
              </span>
              {languageOptions.find((o) => o.value === language)?.label}
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
      </div>
    </div>
  );
};

export default FiltersBar;
