import { Option } from "@customTypes/Option";

export const pluralizeOptions = (options: Option[]) =>
  options.map((option) => option.value).join(", ");
