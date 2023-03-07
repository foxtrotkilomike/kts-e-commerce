import { createContext, useContext } from "react";

import rootStore from "@store/RootStore";
import RootStore from "@store/RootStore/RootStore";

export const RootStoreContext = createContext<RootStore>(rootStore);

export const useRootStore = () => useContext(RootStoreContext);
