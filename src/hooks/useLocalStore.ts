import { useEffect, useRef } from "react";

import { ILocalStore } from "@customTypes/ILocalStore";

export const useLocalStore = <T extends ILocalStore>(
  constructor: () => T
): T => {
  const store = useRef<T | null>(null);

  if (store.current === null) {
    store.current = constructor();
  }

  useEffect(() => {
    return () => store.current?.destroy();
  }, []);

  return store.current;
};
