import { initialSetup } from "@/lib/initial-setup";

const SetupPage = async function () {
  const profile = await initialSetup();
  console.log("🚀 ~ file: page.tsx:5 ~ SetupPage ~ profile:", profile);

  return <div>setup page</div>;
};

export default SetupPage;
