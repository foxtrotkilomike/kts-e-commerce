import "@styles/main.scss";
import { useQueryParamsStoreInit } from "@hooks/useQueryParamsStoreInit";
import Header from "@layouts/Header";
import { Outlet } from "react-router-dom";

import classes from "./App.module.scss";

const App = (): JSX.Element => {
  useQueryParamsStoreInit();

  return (
    <div className={classes.app}>
      <Header />
      <Outlet />
    </div>
  );
};

export default App;
