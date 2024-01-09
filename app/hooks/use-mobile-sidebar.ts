import { create } from 'zustand'

type MobileSidebarStoreActions = {
  onOpen: () => void
  onClose: () => void
}

type MobileSidebarStore = {
  isOpen: boolean
  actions: MobileSidebarStoreActions
}

export const useMobileSidebarStore = create<MobileSidebarStore>((set) => ({
  isOpen: false,
  actions: {
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
  },
}))

export const useMobileSidebar = () =>
  useMobileSidebarStore((state) => state.isOpen)

export const useMobileSidebarActions = () =>
  useMobileSidebarStore((state) => state.actions)
