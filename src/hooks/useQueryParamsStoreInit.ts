import { useEffect } from "react";

import rootStore from "@store/RootStore";
import { action } from "mobx";
import { useLocation } from "react-router-dom";

export const useQueryParamsStoreInit = () => {
  const { search } = useLocation();
  useEffect(
    action(() => rootStore.query.setSearchQuery(search)),
    [search]
  );
};
