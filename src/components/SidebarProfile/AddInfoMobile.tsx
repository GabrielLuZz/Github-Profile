"use client";

import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { ChevronUp } from "lucide-react";
import { AddInfo } from "./AddInfo";

export function AddInfoMobile() {
  const [open, setOpen] = useState(false);

  return (
    <DropdownMenu.Root open={open} onOpenChange={setOpen}>
      <DropdownMenu.Trigger asChild>
        <button className="flex flex-col items-center text-app-primary  ">
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
              >
                <AddInfo />
              </motion.div>
            </DropdownMenu.Content>
          </DropdownMenu.Portal>
        )}
      </AnimatePresence>
    </DropdownMenu.Root>
  );
}
