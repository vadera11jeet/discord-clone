import useSWR from "swr";
import { checkUserExistApi } from "@/config/apiConfig";
import { userProfileFetcher } from "@/fetchers/userFetcher";

export function useGetProfile(userId: string) {
  const { data, isLoading, isValidating, error } = useSWR(
    [checkUserExistApi, userId],
    ([url, userId]) => userProfileFetcher(url, userId)
  );

  if (!userId) {
    return { data: null, isLoading: false, isValidating: false, error: null };
  }

  return { data, isLoading, isValidating, error };
}
