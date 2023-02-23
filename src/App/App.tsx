import "@styles/main.scss";
import Header from "@layouts/Header";

import classes from "./App.module.scss";
import Products from "./pages/Products";

export const App = (props: AppProps): JSX.Element => {
  return (
    <div className={classes.app}>
      <Header />
      <Products />
    </div>
  );
};

type AppProps = Record<string, string>;
