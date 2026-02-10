"use client";

import { usePathname } from "next/navigation";
import React, { createContext, useContext, useEffect, useState } from "react";

interface LoadingContextType {
  loading: boolean;
  startLoading: () => void;
  stopLoading: () => void;
}

const LoadingContext = createContext<LoadingContextType>({
  loading: false,
  startLoading: () => {},
  stopLoading: () => {},
});

export function GlobalLoader({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);

  //  Declare functions FIRST
  const startLoading = () => setLoading(true);
  const stopLoading = () => setLoading(false);

  // Stop loading after route change with delay
  useEffect(() => {
    // Wrap setState in timeout to avoid synchronous setState in effect
    const startTimer = setTimeout(() => setLoading(true), 0);

    const stopTimer = setTimeout(() => setLoading(false), 300);

    return () => {
      clearTimeout(startTimer);
      clearTimeout(stopTimer);
    };
  }, [pathname]);

  return (
    <LoadingContext.Provider value={{ loading, startLoading, stopLoading }}>
      {children}

      {loading && (
        <div className="fixed inset-0 bg-white/70 flex items-center justify-center z-[9999]">
          <div className="w-10 h-10 border-4 border-[#003566] border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
    </LoadingContext.Provider>
  );
}

export function useLoading() {
  return useContext(LoadingContext);
}
