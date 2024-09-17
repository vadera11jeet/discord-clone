import dynamic from "next/dynamic";
import { initialSetup } from "@/lib/initial-setup";
import { redirect } from "next/navigation";
const InitialModal = dynamic(
  () => import("@/components/modals/initial-modal"),
  {
    ssr: false,
    loading: () => <p>Loading...</p>,
  }
);

const SetupPage = async function () {
  const userDetails: CheckUserResponseType = await initialSetup();

  if (userDetails.server) redirect(`/servers/${userDetails.server.id}`);

  return (
    <>
      <InitialModal userId={userDetails?.user?.id} />;
    </>
  );
};

export default SetupPage;
