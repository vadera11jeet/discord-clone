"use client";

import CreateServerModal from "@/components/modals/create-server-modal";
import { useAuth } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import InviteModal from "../modals/invite-modal";
import EditServerModal from "../modals/edit-server-modal";
import MembersModal from "../modals/members-modal";

const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const user = useAuth();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted || !user.userId) return null;

  return (
    <>
      <CreateServerModal userId={user.userId} />
      <InviteModal />
      <EditServerModal />
      <MembersModal />
    </>
  );
};

export default ModalProvider;
