import * as motion from "motion/react-client";
import { AddInfo } from "./AddInfo";
import { FallbackImage } from "../FallbackImage";
import { Building2, MapPin, Link, Instagram, LucideIcon } from "lucide-react";
import { AddInfoMobile } from "./AddInfoMobile";

export interface InfosInterface {
  Icon: LucideIcon;
  text: string;
  link: string;
}

export const SidebarProfile = () => {
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
          src="https://avatars.githubusercontent.com/u/86882285?v=4"
          alt=""
          fill
          className=" object-cover"
        />
      </div>

      <h1
        className="font-bold text-app-gray-100 mb-1"
        style={{
          fontSize: "clamp(1.25rem, 1.5cqi, 1.5rem)",
        }}
      >
        Gabriel Cordeiro
      </h1>
      <p
        className="text-app-gray font-normal text-center max-w-64"
        style={{
          fontSize: "clamp(0.875rem, 1cqi, 1rem)",
          marginBottom: "clamp(1.5rem, 2cqi, 2rem)",
        }}
      >
        Head development team Front-End Magazord - Tagged (#BZ)
      </p>

      <div className="sm:hidden">
        <AddInfoMobile />
      </div>

      <div className="hidden sm:block w-full">
        <AddInfo />
      </div>
    </motion.aside>
  );
};
