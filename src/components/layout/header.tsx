import Image from "next/image";
import logo from "@/assets/logo.svg";

export const Header = () => {
  return (
    <header
      className="bg-app-gray-200 hidden sm:block"
      style={{ padding: "clamp(1rem, 1rem, 1rem) 0" }}
    >
      <div className=" wrapper flex items-center gap-[1.375rem]">
        <Image src={logo} alt="logo" />
        <span className="text-app-white text-2xl">/</span>
        <span className="text-app-white text-base font-light">Profile</span>
      </div>
    </header>
  );
};
