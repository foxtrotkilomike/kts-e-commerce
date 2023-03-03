import * as qs from "qs";

export type QueryParamValue =
  | string
  | string[]
  | qs.ParsedQs
  | qs.ParsedQs[]
  | undefined;
