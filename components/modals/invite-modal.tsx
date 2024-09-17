"use client";
import React, { useState } from "react";
import { Check, Copy, RefreshCw } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useOrigin } from "@/hooks/use-origin";
import { useModal } from "@/hooks/user-model-store";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

const InviteModal = (): React.ReactNode => {
  const { isOpen, onClose, type, data } = useModal();
  const origin = useOrigin();

  //   const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const { server } = data;
  const inviteUrl = `${origin}/invite/${server?.inviteCode}`;

  const onCopyHandler = () => {
    navigator.clipboard.writeText(inviteUrl);
    setCopied(true);
    const timerId = setTimeout(() => {
      setCopied(false);
      clearTimeout(timerId);
    }, 1000);
  };

  return (
    <Dialog open={isOpen && type === "invite"} onOpenChange={onClose}>
      <DialogContent className="overflow-hidden bg-white p-0 text-black">
        <DialogHeader className="px-6 pt-8">
          <DialogTitle className="text-bold text-center text-2xl">
            Invite Friends
          </DialogTitle>
        </DialogHeader>
        <div className="p-6">
          <Label className="text-xs font-bold uppercase text-zinc-500 dark:text-secondary/70">
            Sever invite link
          </Label>
          <div className="mt-2 flex items-center gap-x-2">
            <Input
              className="border-0 bg-zinc-300/50 text-black focus-visible:ring-0 focus-visible:ring-offset-0"
              value={inviteUrl}
              //   disabled
            />
            <Button size="icon" onClick={onCopyHandler}>
              {copied ? (
                <Check className="h-4 w-4" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </Button>
          </div>
          <Button
            variant="link"
            className="mt-4 text-xs text-zinc-500"
            size="sm"
          >
            Generate a new link <RefreshCw className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default InviteModal;
