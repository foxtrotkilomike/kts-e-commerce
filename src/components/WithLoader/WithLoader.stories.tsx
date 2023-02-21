import React from "react";

import { WithLoader, WithLoaderProps } from "./WithLoader";

export default {
  title: "WithLoader",
  component: WithLoader,
  args: {
    children: "",
  },
};

export const Default = (props: WithLoaderProps) => <WithLoader {...props} />;

export const WithChildren = (props: WithLoaderProps) => (
  <WithLoader {...props}>
    <div style={{ width: "201px", height: "201px", background: "#eeeeee" }} />
  </WithLoader>
);

WithChildren.args = {
  loading: true,
};
