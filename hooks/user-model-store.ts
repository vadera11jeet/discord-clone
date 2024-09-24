import { create } from "zustand";

export type ModalType = "createServer" | "invite" | "editServer" | "members";

type ModalData = {
  server?: ServerInfo;
};

type ModalStore = {
  type: ModalType | null;
  isOpen: boolean;
  // eslint-disable-next-line no-unused-vars
  onOpen: (type: ModalType, data?: ModalData) => void;
  onClose: () => void;
  data: ModalData;
};

export const useModal = create<ModalStore>((set) => ({
  type: null,
  isOpen: false,
  data: {},
  onOpen: (type, data = {}) => set({ isOpen: true, type, data }),
  onClose: () => set({ type: null, isOpen: false }),
}));
