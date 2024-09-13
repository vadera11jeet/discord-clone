import React from "react";
import NavigationAction from "./navigation-action";
import { getProfile } from "@/lib/current-profile";
import { redirect } from "next/navigation";
import axiosInstance from "@/config/axiosConfig";
import { userServerListApi } from "@/config/apiConfig";
import { Separator } from "../ui/separator";

const NavigationSideBar = async () => {
  const profile = await getProfile();

  if (!profile) redirect("/");

  const serverList = await axiosInstance.get(
    `${userServerListApi}/${profile.user.id}`
  );

  return (
    <div className="flex h-full w-full flex-col items-center space-y-4 py-3 text-primary dark:bg-[#1E1F22]">
      <NavigationAction />
      <Separator className="mx-auto h-[2px] w-10 rounded-md bg-zinc-300 dark:bg-zinc-700" />
    </div>
  );
};

export default NavigationSideBar;
