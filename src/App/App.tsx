import "@styles/main.scss";
import Header from "@layouts/Header";

import classes from "./App.module.scss";

export const App = (props: AppProps): JSX.Element => {
  return (
    <div className={classes.app}>
      <Header />
    </div>
  );
};

type AppProps = Record<string, string>;
