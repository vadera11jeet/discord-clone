import { getProfile } from "@/lib/current-profile";
import { auth } from "@clerk/nextjs/server";
import axiosInstance from "@/config/axiosConfig";
import { serverApi } from "@/config/apiConfig";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import ServerSidebar from "@/components/servers/server-sidebar";

const ServerIdLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { serverId: string };
}) => {
  const profile = await getProfile();

  const nextCookies = cookies();
  const token = nextCookies.get("__session");

  if (!profile) return auth().redirectToSignIn();

  const {
    data: { data: serverInfo },
  } = await axiosInstance.get<ApiResponse<ServerInfo>>(
    `${serverApi}/${params.serverId}`,
    {
      headers: {
        Cookie: `__session=${token!.value};`,
      },
    }
  );

  if (!serverInfo) {
    return redirect("/");
  }

  return (
    <div className="h-full">
      <div className="fixed inset-y-0 z-20 hidden w-60 flex-col text-primary md:flex">
        <ServerSidebar serverInfo={serverInfo} />
      </div>
      <main className="h-full md:pl-60">{children}</main>
    </div>
  );
};

export default ServerIdLayout;
