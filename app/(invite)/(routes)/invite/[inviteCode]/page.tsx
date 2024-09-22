import { getProfile } from "@/lib/current-profile";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import axiosInstance from "@/config/axiosConfig";
import { serverDetailsByInviteCode } from "@/config/apiConfig";
import { cookies } from "next/headers";

type InviteCodePageProps = {
  params: {
    inviteCode: string;
  };
};

const InviteCodePage = async ({ params }: InviteCodePageProps) => {
  const profile = await getProfile();

  const nextCookies = cookies();
  const token = nextCookies.get("__session");

  if (!profile) return auth().redirectToSignIn();

  if (!params.inviteCode) redirect("/");

  const {
    data: { data: isServerExisted },
  } = await axiosInstance.get<ApiResponse<Server | null>>(
    `${serverDetailsByInviteCode}/${params.inviteCode}`,
    {
      headers: {
        Cookie: `__session=${token!.value};`,
      },
    }
  );

  if (isServerExisted) redirect(`/servers/${isServerExisted.id}`);

  const {
    data: { data: newSever },
  } = await axiosInstance.patch<ApiResponse<Server>>(
    `${serverDetailsByInviteCode}/${params.inviteCode}`,
    {
      data: {
        profileId: profile.user.id,
        inviteCode: params.inviteCode,
      },
    },
    {
      headers: {
        Cookie: `__session=${token!.value};`,
      },
    }
  );

  if (newSever) redirect(`/servers/${newSever.id}`);

  return null;
};

export default InviteCodePage;
