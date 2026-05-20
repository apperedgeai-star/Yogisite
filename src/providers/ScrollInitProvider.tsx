"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type ScrollInitContextValue = {
  scrollReady: boolean;
  markScrollReady: () => void;
};

const ScrollInitContext = createContext<ScrollInitContextValue>({
  scrollReady: false,
  markScrollReady: () => {},
});

export function ScrollInitProvider({ children }: { children: ReactNode }) {
  const [scrollReady, setScrollReady] = useState(false);

  const markScrollReady = useCallback(() => {
    setScrollReady(true);
  }, []);

  const value = useMemo(
    () => ({ scrollReady, markScrollReady }),
    [scrollReady, markScrollReady]
  );

  return (
    <ScrollInitContext.Provider value={value}>
      {children}
    </ScrollInitContext.Provider>
  );
}

export function useScrollInit() {
  return useContext(ScrollInitContext);
}
