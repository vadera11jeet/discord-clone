import { auth } from "@clerk/nextjs/server";
import { checkUserExistApi } from "@/config/apiConfig";
import axiosInstance from "@/config/axiosConfig";

export async function getProfile(): Promise<
  CheckUserResponseType | null | undefined
> {
  const { userId } = auth();

  if (!userId) {
    return null;
  }

  try {
    const isUserExists = await axiosInstance.get(checkUserExistApi, {
      data: {
        userId,
      },
    });
    return isUserExists.data.data;
  } catch (err) {
    console.log(err);
  }
}
