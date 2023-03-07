import React from "react";

import rootStore from "@store/RootStore";

import { RootStoreContext } from "./RootStoreContext";

const RootStoreContextProvider = ({
  children,
}: React.PropsWithChildren): JSX.Element => {
  return (
    <RootStoreContext.Provider value={rootStore}>
      {children}
    </RootStoreContext.Provider>
  );
};

export default RootStoreContextProvider;
