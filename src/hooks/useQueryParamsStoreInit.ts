import rootStore from "@store/RootStore";
import { useLocation } from "react-router-dom";

export const useQueryParamsStoreInit = () => {
  const { search } = useLocation();
  rootStore.query.setSearchQuery(search);
};
