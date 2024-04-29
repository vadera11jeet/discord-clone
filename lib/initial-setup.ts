import { currentUser } from "@clerk/nextjs/server";
import axiosInstance from "@/config/axiosConfig";
import { checkUserExistApi } from "@/config/apiConfig";
import { redirect } from "next/navigation";

export const initialSetup = async function () {
  const user = await currentUser();
  if (!user) {
    return redirect("/sign-in");
  }

  console.log(
    "🚀 ~ file: initial-setup.ts:13 ~ initialSetup ~ checkUserExistApi:",
    checkUserExistApi
  );
  const isUserExists = await axiosInstance.get(checkUserExistApi, {
    data: {
      userId: user.id,
    },
  });

  if (isUserExists.data) return isUserExists.data.data;

  //   const newUserDetails = {
  //     userId: user.id,
  //     name: `${user.firstName} ${user.lastName}`,
  //     imageUrl: user.imageUrl,
  //     email: user.emailAddresses[0].emailAddress,
  //   };

  //   const createdUser = await axiosInstance.post(CreateUserApi, {
  //     data: { ...newUserDetails },
  //   });

  //   return createdUser.data.data;
};
