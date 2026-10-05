"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { captureUtmParams } from "@/lib/utm";
import { trackLeadModalOpen } from "@/lib/tracking";
import LeadModal from "./lead-modal";

type LeadModalContextValue = {
  isOpen: boolean;
  origem: string | null;
  open: (origem?: string) => void;
  close: () => void;
};

const LeadModalContext = createContext<LeadModalContextValue | null>(null);

/**
 * Provider único do modal de captura de lead.
 * Envolva a aplicação em app/layout.tsx e acesse com useLeadModal().
 */
export function LeadModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [origem, setOrigem] = useState<string | null>(null);

  // Elemento que abriu o modal — para devolver o foco ao fechar.
  const triggerRef = useRef<HTMLElement | null>(null);

  // Captura UTMs da URL uma única vez ao montar (persiste em sessionStorage).
  useEffect(() => {
    captureUtmParams();
  }, []);

  const open = useCallback((origemClique: string = "desconhecido") => {
    triggerRef.current =
      document.activeElement instanceof HTMLElement ? document.activeElement : null;
    setOrigem(origemClique);
    setIsOpen(true);
    trackLeadModalOpen(origemClique);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    // Devolve o foco ao elemento que abriu o modal.
    triggerRef.current?.focus?.();
  }, []);

  // Bloqueia o scroll do body enquanto o modal está aberto.
  useEffect(() => {
    if (!isOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  const value = useMemo(
    () => ({ isOpen, origem, open, close }),
    [isOpen, origem, open, close]
  );

  return (
    <LeadModalContext.Provider value={value}>
      {children}
      <LeadModal />
    </LeadModalContext.Provider>
  );
}

export function useLeadModal(): LeadModalContextValue {
  const context = useContext(LeadModalContext);
  if (!context) {
    throw new Error("useLeadModal deve ser usado dentro de <LeadModalProvider>");
  }
  return context;
}
