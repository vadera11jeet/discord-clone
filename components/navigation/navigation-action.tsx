"use client";

import { Plus } from "lucide-react";
import React from "react";
import ActionToolTip from "../action-tooltip";
import { useModal } from "@/hooks/user-model-store";

const NavigationAction = () => {
  const { onOpen } = useModal();
  return (
    <div>
      <ActionToolTip side="right" align="center" label="Add a server">
        <button className="group" onClick={() => onOpen("createServer")}>
          <div className="mx-3 flex h-[48px] w-[48px] items-center justify-center rounded-3xl transition-all group-hover:rounded-[16px] group-hover:bg-emerald-500 dark:bg-neutral-700">
            <Plus
              className="text-emerald-500 transition group-hover:text-white"
              size={25}
            />
          </div>
        </button>
      </ActionToolTip>
    </div>
  );
};

export default NavigationAction;
