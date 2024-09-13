"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import ActionToolTip from "../action-tooltip";

type NavigationItemProps = {
  imageUrl: string;
  id: string;
  name: string;
};

const NavigationItem = ({ id, imageUrl, name }: NavigationItemProps) => {
  const params = useParams();
  const router = useRouter();

  const onClickHandler = () => {
    router.push(`/servers/${id}`);
  };

  return (
    <ActionToolTip align="center" side="right" label={name} key={id}>
      <button
        className="group relative  flex items-center"
        onClick={onClickHandler}
      >
        <div
          className={cn(
            "absolute, left-0 w-[4px] rounded-r-full bg-primary transition-all",
            params?.serverId !== id && "group-hover:h-[20px]",
            params?.serverId === id ? "h-[36px]" : "h-[8px]"
          )}
        />

        <div
          className={cn(
            "group relative mx-3 flex h-[48px] w-[48px] overflow-hidden rounded-[24px] transition-all group-hover:rounded-[16px]",
            params?.serverId === id &&
              "rounded-[16px] bg-primary/10 text-primary"
          )}
        >
          <Image fill src={imageUrl} alt="channel" />
        </div>
      </button>
    </ActionToolTip>
  );
};

export default NavigationItem;
