import { getProfile } from "@/lib/current-profile";
import { auth } from "@clerk/nextjs/server";

const ServerIdLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { serverId: string };
}) => {
  const profile = await getProfile();

  if (!profile) return auth().redirectToSignIn();

  console.log(params);

  return <div>{children}</div>;
};

export default ServerIdLayout;
