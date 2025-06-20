"use client";
import * as Tabs from "@radix-ui/react-tabs";
import { useProfileStore } from "../store/useProfileStore";
import { cn } from "@/lib/utils";
import FiltersBar from "./FiltersBar";
import RepositoryList from "./RepositoryList";
import StarredRepositoryList from "./StarredRepositoryList";
import { motion, AnimatePresence } from "framer-motion";
import { useRef, useLayoutEffect, useState } from "react";

const TabsSection = () => {
  const selectedTab = useProfileStore((s) => s.selectedTab);
  const setSelectedTab = useProfileStore((s) => s.setSelectedTab);
  const repoTabRef = useRef<HTMLButtonElement>(null);
  const starTabRef = useRef<HTMLButtonElement>(null);
  const [underline, setUnderline] = useState({ left: 0, width: 0 });

  useLayoutEffect(() => {
    const ref = selectedTab === "repositories" ? repoTabRef : starTabRef;
    if (ref.current) {
      setUnderline({
        left: ref.current.offsetLeft,
        width: ref.current.offsetWidth,
      });
    }
  }, [selectedTab]);

  return (
    <Tabs.Root
      value={selectedTab}
      onValueChange={(value) =>
        setSelectedTab(value as "repositories" | "starred")
      }
      className="w-full"
    >
      <div className="relative">
        <Tabs.List
          className="flex relative overflow-x-auto"
          style={{
            marginBottom: "clamp(1.5rem, 3cqi, 3rem)",
            gap: "clamp(1.4rem, 4.25cqi, 4.25rem)",
            scrollbarWidth: "none",
          }}
        >
          <Tabs.Trigger
            ref={repoTabRef}
            value="repositories"
            className={cn(
              "relative flex items-center py-2 pl-2 font-normal  transition-colors duration-200 ease-in-out outline-none",
              selectedTab === "repositories"
                ? "text-app-black"
                : "text-app-gray hover:text-app-black",
              "focus-visible:ring-2 focus-visible:ring-app-black"
            )}
            style={{
              fontSize: "clamp(1rem, 1.125cqi, 1.125rem)",
            }}
            tabIndex={0}
            aria-label="Repositórios"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              className={cn(
                selectedTab === "repositories"
                  ? "fill-app-black"
                  : "fill-app-gray hover:fill-app-black"
              )}
              style={{
                marginRight: "clamp(0.625rem, 1.25cqi, 1.25rem)",
              }}
            >
              <path d="M19 2.01001H6C4.794 2.01001 3 2.80901 3 5.01001V19.01C3 21.211 4.794 22.01 6 22.01H21V20.01H6.012C5.55 19.998 5 19.815 5 19.01C5 18.909 5.009 18.819 5.024 18.737C5.136 18.162 5.607 18.02 6.011 18.01H20C20.018 18.01 20.031 18.001 20.049 18H21V4.01001C21 2.90701 20.103 2.01001 19 2.01001ZM19 16.01H5V5.01001C5 4.20401 5.55 4.02201 6 4.01001H13V11.01L15 10.01L17 11.01V4.01001H19V16.01Z" />
            </svg>
            Repositories
            <span
              className="ml-2 px-3 py-1 rounded-[3.75rem] bg-app-gray-300
            border border-app-gray-400 text-app-gray text-sm font-normal transition-colors duration-200"
            >
              81
            </span>
          </Tabs.Trigger>
          <Tabs.Trigger
            ref={starTabRef}
            value="starred"
            className={cn(
              "relative flex items-center py-2 pl-2 font-normal  transition-colors duration-200 ease-in-out outline-none",
              selectedTab === "starred"
                ? "text-app-black"
                : "text-app-gray hover:text-app-black",
              "focus-visible:ring-2 focus-visible:ring-app-black"
            )}
            style={{
              fontSize: "clamp(1rem, 1.125cqi, 1.125rem)",
            }}
            tabIndex={0}
            aria-label="Starred"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={cn(
                selectedTab === "starred"
                  ? "stroke-app-black"
                  : "stroke-app-gray hover:stroke-app-black"
              )}
              style={{
                marginRight: "clamp(0.625rem, 1.25cqi, 1.25rem)",
              }}
            >
              <path
                d="M11.0741 2.633C11.3941 1.789 12.6051 1.789 12.9261 2.633L14.9961 8.367C15.1411 8.747 15.5101 9 15.9221 9H21.0091C21.9491 9 22.3591 10.17 21.6201 10.743L18.0001 14C17.8379 14.1247 17.7194 14.2975 17.6616 14.4937C17.6037 14.6898 17.6095 14.8993 17.6781 15.092L19.0001 20.695C19.3221 21.595 18.2801 22.368 17.4921 21.814L12.5751 18.694C12.4067 18.5757 12.2059 18.5122 12.0001 18.5122C11.7943 18.5122 11.5935 18.5757 11.4251 18.694L6.50808 21.814C5.72108 22.368 4.67808 21.594 5.00008 20.695L6.32208 15.092C6.39066 14.8993 6.39643 14.6898 6.33859 14.4937C6.28074 14.2975 6.16223 14.1247 6.00008 14L2.38008 10.743C1.64008 10.17 2.05208 9 2.99008 9H8.07708C8.27737 9.00067 8.47314 8.9405 8.63849 8.82747C8.80385 8.71444 8.93098 8.55387 9.00308 8.367L11.0731 2.633H11.0741Z"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            Starred
            <span
              className="ml-2 px-3 py-1 rounded-[3.75rem] bg-app-gray-300
            border border-app-gray-400 text-app-gray text-sm font-normal transition-colors duration-200"
            >
              12
            </span>
          </Tabs.Trigger>
          {/* Underline animado */}
          <motion.div
            className="absolute bottom-0 h-0.5 bg-app-secondary rounded-full"
            animate={{ left: underline.left, width: underline.width }}
            transition={{ type: "spring", stiffness: 350, damping: 30 }}
          />
        </Tabs.List>
      </div>
      <AnimatePresence mode="wait" initial={false}>
        {selectedTab === "repositories" && (
          <motion.div
            key="repositories"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            <div className="flex flex-col gap-6">
              <FiltersBar />
              <RepositoryList />
            </div>
          </motion.div>
        )}
        {selectedTab === "starred" && (
          <motion.div
            key="starred"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            <div className="flex flex-col gap-6">
              <FiltersBar />
              <StarredRepositoryList />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Tabs.Root>
  );
};

export default TabsSection;
