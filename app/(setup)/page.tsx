import { initialSetup } from "@/lib/initial-setup";
import { redirect } from "next/navigation";

const SetupPage = async function () {
  const userDetails: CheckUserResponseType = await initialSetup();

  if (userDetails.server) redirect(`/servers/${userDetails.server.id}`);

  return <div>Create Server</div>;
};

export default SetupPage;
