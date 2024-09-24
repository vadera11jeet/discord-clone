"use client";
import React, { useState } from "react";
import { DialogDescription } from "@radix-ui/react-dialog";
import {
  Check,
  Gavel,
  Loader2,
  MoreVertical,
  Shield,
  ShieldAlert,
  ShieldCheck,
  ShieldQuestion,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useModal } from "@/hooks/user-model-store";
import { ScrollArea } from "../ui/scroll-area";
import UserAvatar from "../user-avatar";
import axiosInstance from "@/config/axiosConfig";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuTrigger,
  DropdownMenuSubTrigger,
} from "../ui/dropdown-menu";
import { membersApi } from "@/config/apiConfig";
import { useRouter } from "next/navigation";

const roleIconMap = {
  GUEST: null,
  MODERATOR: <ShieldCheck className="ml-2 h-4 w-4 text-indigo-700" />,
  ADMIN: <ShieldAlert className="ml-2 h-4 w-4 text-rose-500" />,
};

const MembersModal = (): React.ReactNode => {
  const router = useRouter();
  const { isOpen, onClose, type, data, onOpen } = useModal();

  const [loadingId, setLoadingId] = useState<string>("");

  const { server } = data;

  const onRoleChange = async function (
    memberId: string,
    memberRole: "ADMIN" | "MODERATOR" | "GUEST"
  ) {
    try {
      setLoadingId(memberId);
      const response = await axiosInstance.patch(
        `${membersApi}/${memberId}/${server?.id}`,
        {
          role: memberRole,
        }
      );
      router.refresh();
      onOpen("members", { server: response.data.data });
    } catch (err) {
      console.log(err);
    } finally {
      setLoadingId("");
    }
  };

  const onKick = async function (memberId: string) {
    try {
      setLoadingId(memberId);
      const response = await axiosInstance.delete(
        `${membersApi}/${memberId}/${server?.id}`
      );

      router.refresh();
      onOpen("members", { server: response.data.data });
    } catch (err) {
      console.log(err);
    } finally {
      setLoadingId("");
    }
  };

  return (
    <Dialog open={isOpen && type === "members"} onOpenChange={onClose}>
      <DialogContent className="overflow-hidden bg-white text-black">
        <DialogHeader className="px-6 pt-8">
          <DialogTitle className="text-bold text-center text-2xl">
            Manage Members
          </DialogTitle>
          <DialogDescription className="mx-auto my-0 text-zinc-500">
            {server?.members?.length}{" "}
            {`Member${server?.members && server?.members.length > 1 ? "s" : ""}`}
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="mt-8  max-h-[420px] pr-6">
          {server?.members?.map((member) => (
            <div key={member.id} className="mb-6 flex items-center gap-x-2">
              <UserAvatar src={member.profile.imageUrl} />
              <div className="flex flex-col gap-y-1">
                <div className="flex items-center text-xs font-semibold">
                  {member.profile.name} {roleIconMap[member.role]}
                </div>
                <p className="text-xs text-zinc-500">{member.profile.email}</p>
              </div>
              {server.profileId !== member.profileId &&
                loadingId !== member.id && (
                  <div className="ml-auto mr-3">
                    <DropdownMenu>
                      <DropdownMenuTrigger>
                        <MoreVertical className="h-4 w-4 text-zinc-500" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent side="left">
                        <DropdownMenuSub>
                          <DropdownMenuSubTrigger className="flex items-center">
                            <ShieldQuestion className="mr-2 h-4 w-4" />
                            <span>Role</span>
                          </DropdownMenuSubTrigger>
                          <DropdownMenuPortal>
                            <DropdownMenuSubContent>
                              <DropdownMenuItem
                                onClick={() => onRoleChange(member.id, "GUEST")}
                              >
                                <Shield className="mr-2 h-4 w-4" />
                                Guest{" "}
                                {member.role === "GUEST" && (
                                  <Check className="ml-auto h-4 w-4" />
                                )}
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() =>
                                  onRoleChange(member.id, "MODERATOR")
                                }
                              >
                                <ShieldCheck className="mr-2 h-4 w-4" />
                                Moderator{" "}
                                {member.role === "MODERATOR" && (
                                  <Check className="ml-auto h-4 w-4" />
                                )}
                              </DropdownMenuItem>
                            </DropdownMenuSubContent>
                          </DropdownMenuPortal>
                        </DropdownMenuSub>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => onKick(member.id)}>
                          <Gavel className="mr-2 h-4 w-4" />
                          Kick
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                )}
              {loadingId === member.id && (
                <Loader2 className="ml-auto h-4   w-4 animate-spin text-zinc-500" />
              )}
            </div>
          ))}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default MembersModal;
