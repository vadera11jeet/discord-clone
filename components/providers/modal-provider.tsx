"use client";

import CreateServerModal from "@/components/modals/create-server-modal";
import { useAuth } from "@clerk/nextjs";
import { useEffect, useState } from "react";

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
    </>
  );
};

export default ModalProvider;
