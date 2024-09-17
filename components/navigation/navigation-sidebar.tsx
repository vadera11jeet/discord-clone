import { userServerListApi } from "@/config/apiConfig";
import axiosInstance from "@/config/axiosConfig";
import { getProfile } from "@/lib/current-profile";
import { UserButton } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { ModeToggle } from "../mode-toggle";
import { ScrollArea } from "../ui/scroll-area";
import { Separator } from "../ui/separator";
import NavigationAction from "./navigation-action";
import NavigationItem from "./navigation-items";
import { cookies } from "next/headers";

const NavigationSideBar = async () => {
  const profile = await getProfile();

  if (!profile) redirect("/");

  const nextCookies = cookies();
  const token = nextCookies.get("__session");

  const {
    data: {
      data: { serverList },
    },
  } = await axiosInstance.get<{ data: ApiResponse<Server[]> }>(
    `${userServerListApi}/${profile?.user?.id}`,
    {
      headers: {
        Cookie: `__session=${token!.value};`,
      },
    }
  );

  return (
    <div className="flex h-full w-full flex-col items-center space-y-4 py-3 text-primary dark:bg-[#1E1F22]">
      <NavigationAction />
      <Separator className="mx-auto h-[2px] w-10 rounded-md bg-zinc-300 dark:bg-zinc-700" />
      <ScrollArea className="w-full flex-1 items-center justify-center">
        {serverList &&
          serverList.map((server: Server) => (
            <div key={server.id} className="mb-4">
              <NavigationItem
                imageUrl={server.imageUrl}
                id={server.id}
                name={server.name}
              />
            </div>
          ))}
      </ScrollArea>

      <div className="mt-auto flex flex-col items-center gap-y-4 pb-3">
        <ModeToggle />
        <UserButton
          afterSignOutUrl="/"
          appearance={{
            elements: {
              avatarBox: "h-[48px] w-[48px]",
            },
          }}
        />
      </div>
    </div>
  );
};

export default NavigationSideBar;
