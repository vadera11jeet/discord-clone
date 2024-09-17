import dynamic from "next/dynamic";
import { getProfile } from "@/lib/current-profile";
import { CHANNEL_TYPE } from "@/utils/constant";
import { redirect } from "next/navigation";
import React from "react";
const ServerHeader = dynamic(() => import("./server-header"), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});

type ServerSidebarProps = {
  serverInfo: ServerInfo;
};

const ServerSidebar = async ({ serverInfo }: ServerSidebarProps) => {
  const profile = await getProfile();

  if (!profile) redirect("/");

  const textChannels: Channel[] = [],
    audioChannels: Channel[] = [],
    videoChannels: Channel[] = [];

  const members: Member[] = [];

  // eslint-disable-next-line
  let role = "";

  serverInfo?.channels.forEach((channel) => {
    switch (channel.type) {
      case CHANNEL_TYPE.VIDEO:
        videoChannels.push(channel);
        break;
      case CHANNEL_TYPE.AUDIO:
        audioChannels.push(channel);
        break;
      case CHANNEL_TYPE.TEXT:
        textChannels.push(channel);
    }
  });

  serverInfo?.members.forEach((member) => {
    if (member.profileId !== profile?.user.id) members.push(member);
    else {
      role = member.role;
    }
  });

  return (
    <div className="flex h-full w-full flex-col bg-[#f2f3f5] text-primary dark:bg-[#2b2d31] ">
      <ServerHeader server={serverInfo} role={role} />
    </div>
  );
};

export default ServerSidebar;
