import React from "react";

import { Option } from "@customTypes/Option";

import MultiDropdown, { MultiDropdownProps } from "./MultiDropdown";

const OPTIONS: Option[] = [
  { key: 1, value: "Moscow" },
  { key: 2, value: "Saint Petersburg" },
  { key: 3, value: "Ekaterinburg" },
];

export default {
  title: "MultiDropdown",
  component: MultiDropdown,
  argTypes: {
    value: {
      mapping: String,
      control: "object",
    },
    disabled: {
      mapping: {
        true: true,
        false: false,
        undefined: undefined,
      },
      control: "boolean",
    },
  },
};

export const Default = (props: MultiDropdownProps) => {
  const [value, setValue] = React.useState<Option["key"]>(
    props.selectedOptionKey
  );

  return (
    <MultiDropdown
      disabled={props.disabled}
      options={OPTIONS}
      onChange={setValue}
      selectedOptionKey={value}
    />
  );
};
Default.args = {
  disabled: true,
};
