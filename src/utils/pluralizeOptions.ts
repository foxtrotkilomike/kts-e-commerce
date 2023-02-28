import { Option } from "@components/MultiDropdown";

export const pluralizeOptions = (options: Option[]) =>
  options.map((option) => option.value).join(", ");
