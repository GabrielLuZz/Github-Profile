"use client";
import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Option = { value: string; label: string };

interface ModalFilterProps {
  open: boolean;
  onClose: () => void;
  title: string;
  options: Option[];
  selected: string;
  onSelect: (value: string) => void;
}

const ModalFilter = ({
  open,
  onClose,
  title,
  options,
  selected,
  onSelect,
}: ModalFilterProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  // Focus trap e ESC para fechar
  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  // Fechar ao clicar fora
  useEffect(() => {
    if (!open) return;
    const handleClick = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-app-black/30"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18, ease: "easeOut" }}
          aria-modal="true"
          role="dialog"
        >
          <motion.div
            ref={modalRef}
            className="w-full h-full bg-app-white rounded-t-2xl md:rounded-2xl flex flex-col p-6 relative"
            initial={{ y: 64, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 64, opacity: 0 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            tabIndex={-1}
          >
            {/* Barra cinza */}
            <div
              className="w-16 h-1.5 bg-app-gray-400 rounded-full mx-auto mt-2 mb-6"
              aria-hidden="true"
            />
            {/* Topo: título e fechar */}
            <div className="flex items-center justify-between mb-6">
              <span className="font-bold text-lg text-app-black">{title}</span>
              <button
                onClick={onClose}
                aria-label="Fechar modal"
                className="p-2 rounded-full hover:bg-app-gray-300 focus:bg-app-gray-300 focus-visible:ring-2 focus-visible:ring-app-error outline-none"
                tabIndex={0}
              >
                <svg
                  width="22"
                  height="22"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="text-app-error"
                >
                  <path
                    d="M18 6L6 18M6 6l12 12"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>
            {/* Lista de opções */}
            <div className="flex flex-col gap-4">
              {options.map((opt) => (
                <label
                  key={opt.value}
                  className="flex items-center gap-3 cursor-pointer select-none text-app-black text-base"
                >
                  <input
                    type="checkbox"
                    checked={selected === opt.value}
                    onChange={() => onSelect(opt.value)}
                    className="w-5 h-5 rounded border-2 border-zinc-300 text-app-primary focus:ring-app-primary focus:ring-2 transition"
                    tabIndex={0}
                    aria-checked={selected === opt.value}
                  />
                  {opt.label}
                </label>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ModalFilter;
