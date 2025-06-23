"use client";
import * as motion from "motion/react-client";
import { AddInfo } from "./AddInfo";
import { FallbackImage } from "../FallbackImage";
import { Building2, MapPin, Link, Instagram, LucideIcon } from "lucide-react";
import { AddInfoMobile } from "./AddInfoMobile";
import { useProfileStore } from "../../store/useProfileStore";
import { useGitHubUser } from "../../hooks/useGitHub";

export interface InfosInterface {
  Icon: LucideIcon;
  text: string;
  link: string;
}

export const SidebarProfile = () => {
  const username = useProfileStore((state) => state.username);
  const { data: user, isLoading, error } = useGitHubUser(username);

  if (isLoading) {
    return (
      <motion.aside
        initial={{ opacity: 0, x: -24 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="flex flex-col items-center"
      >
        <div
          className="rounded-full bg-app-gray-300 animate-pulse"
          style={{
            width: "clamp(6.5rem, 9.375cqi, 9.375rem)",
            height: "clamp(6.5rem, 9.375cqi, 9.375rem)",
            marginBottom: "clamp(1rem, 1.5cqi, 1.5rem)",
          }}
        />
        
        <div className="h-6 bg-app-gray-300 rounded animate-pulse mb-1 w-32" />
        
        <div className="h-4 bg-app-gray-300 rounded animate-pulse mb-1 w-48" />
        <div className="h-4 bg-app-gray-300 rounded animate-pulse w-40" />
        
        <div className="sm:hidden">
          <AddInfoMobile />
        </div>

        <div className="hidden sm:block w-full">
          <AddInfo />
        </div>
      </motion.aside>
    );
  }

  if (error) {
    return (
      <motion.aside
        initial={{ opacity: 0, x: -24 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="flex flex-col items-center"
      >
        <div className="text-red-500 text-center">
          Erro ao carregar perfil: {error.message}
        </div>
      </motion.aside>
    );
  }

  return (
    <motion.aside
      initial={{ opacity: 0, x: -24 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="flex flex-col items-center"
    >
      <div
        className="rounded-full relative overflow-hidden"
        style={{
          width: "clamp(6.5rem, 9.375cqi, 9.375rem)",
          height: "clamp(6.5rem, 9.375cqi, 9.375rem)",
          marginBottom: "clamp(1rem, 1.5cqi, 1.5rem)",
        }}
      >
        <FallbackImage
          src={user?.avatar_url || "https://avatars.githubusercontent.com/u/86882285?v=4"}
          alt={`Avatar de ${user?.name || username}`}
          fill
          className="object-cover"
        />
      </div>

      <h1
        className="font-bold text-app-gray-100 mb-1"
        style={{
          fontSize: "clamp(1.25rem, 1.5cqi, 1.5rem)",
        }}
      >
        {user?.name || user?.login || "Usuário"}
      </h1>
      <p
        className="text-app-gray font-normal text-center max-w-64"
        style={{
          fontSize: "clamp(0.875rem, 1cqi, 1rem)",
          marginBottom: "clamp(1.5rem, 2cqi, 2rem)",
        }}
      >
        {user?.bio || "Sem descrição"}
      </p>

      <div className="sm:hidden">
        <AddInfoMobile user={user} />
      </div>

      <div className="hidden sm:block w-full">
        <AddInfo user={user} />
      </div>
    </motion.aside>
  );
};
