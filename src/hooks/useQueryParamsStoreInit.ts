import { useEffect } from "react";

import rootStore from "@store/RootStore";
import { useLocation } from "react-router-dom";

export const useQueryParamsStoreInit = () => {
  const { search } = useLocation();
  useEffect(() => {
    rootStore.query.setSearchQuery(search);
  });
};
