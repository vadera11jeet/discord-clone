import axiosInstance from "@/config/axiosConfig";

export async function userProfileFetcher(
  url: string,
  data: string
): Promise<CheckUserResponseType> {
  const response = await axiosInstance.get(url, { data });
  return response.data.data;
}
