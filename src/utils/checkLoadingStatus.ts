import { LoadingStatus } from "@customTypes/LoadingStatus";

export const checkLoadingStatus = (loadingStatus: LoadingStatus): boolean => {
  return (
    loadingStatus === LoadingStatus.INITIAL ||
    loadingStatus === LoadingStatus.PENDING
  );
};
