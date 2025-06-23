"use client";

import { AnimatePresence, motion } from "motion/react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { useState } from "react";
import { ChevronUp } from "lucide-react";
import { GitHubUser } from "@/services/api";
import {
  Building,
  Instagram,
  Link,
  MapPin,
  Twitter,
} from "lucide-react";

interface AddInfoMobileProps {
  user: GitHubUser;
}

export function AddInfoMobile({ user }: AddInfoMobileProps) {
  const [open, setOpen] = useState(false);

  const infos = [
    {
      icon: <Building size={16} className="text-app-primary" />,
      label: user.company,
      href: null,
    },
    {
      icon: <MapPin size={16} className="text-app-primary" />,
      label: user.location,
      href: null,
    },
    {
      icon: <Link size={16} className="text-app-primary" />,
      label: user.blog,
      href: user.blog,
    },
    {
      icon: <Twitter size={16} className="text-app-primary" />,
      label: user.twitter_username,
      href: user.twitter_username
        ? `https://twitter.com/${user.twitter_username}`
        : null,
    },
    {
      icon: <Instagram size={16} className="text-app-primary" />,
      label: "Instagram",
      href: "https://instagram.com/gabriel.s.cordeiro",
    },
  ].filter((info) => info.label);

  return (
    <div className="sm:hidden w-full p-4 flex justify-center">
        <DropdownMenu.Root open={open} onOpenChange={setOpen}>
        <DropdownMenu.Trigger asChild>
            <button className="flex flex-col items-center text-app-primary">
            Informações Adicionais
            <ChevronUp
                className={`mt-1 transition-transform duration-300 ${
                open ? "rotate-180" : ""
                }`}
                size={18}
            />
            </button>
        </DropdownMenu.Trigger>

        <AnimatePresence>
            {open && (
            <DropdownMenu.Portal forceMount>
                <DropdownMenu.Content align="center" sideOffset={8} asChild>
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="w-full"
                >
                    <ul className="flex flex-col gap-4 w-full bg-app-gray-300 p-4 rounded-2xl">
                        {infos.map((info, index) => (
                        <li key={index} className="flex gap-2 items-center">
                            {info.icon}
                            {info.href ? (
                            <a
                                href={info.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-app-primary text-sm hover:underline focus:underline outline-none font-normal"
                                tabIndex={0}
                                aria-label={info.label!}
                            >
                                {info.label}
                            </a>
                            ) : (
                            <span
                                className="text-app-primary text-sm font-normal"
                                aria-label={info.label!}
                            >
                                {info.label}
                            </span>
                            )}
                        </li>
                        ))}
                    </ul>
                </motion.div>
                </DropdownMenu.Content>
            </DropdownMenu.Portal>
            )}
        </AnimatePresence>
        </DropdownMenu.Root>
    </div>
  );
}
