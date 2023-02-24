import { Routes } from "@config/constants";

export const parseLocationPathName = (pathName: string) => {
  const trimmedPathName = removeLeadingSlash(pathName);
  if (trimmedPathName === "") return Routes.MAIN;
  let parsedLocation = trimmedPathName;
  const isRootLocation = trimmedPathName.match(/\//) === null;
  if (!isRootLocation) {
    parsedLocation = trimmedPathName.match(/^.*(?=(\/))/)![0] as Routes;
  }

  return ("/" + parsedLocation) as Routes;
};

const removeLeadingSlash = (pathName: string) => pathName.slice(1);
