import { checkUserExistApi, createUserApi } from "@/config/apiConfig";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import axiosInstance from "@/config/axiosConfig";

export const initialSetup = async function (): Promise<CheckUserResponseType> {
  const user = await currentUser();
  if (!user) {
    return redirect("/sign-in");
  }

  const isUserExists = await axiosInstance.get(checkUserExistApi, {
    data: {
      userId: user.id,
    },
  });

  if (isUserExists.data.data.user) return isUserExists.data.data;

  const newUserDetails = {
    userId: user.id,
    name: `${user.firstName} ${user.lastName}`,
    imageUrl: user.imageUrl,
    email: user.emailAddresses[0].emailAddress,
  };

  const createdUser = await axiosInstance.post(createUserApi, newUserDetails);

  return createdUser.data.data;
};
