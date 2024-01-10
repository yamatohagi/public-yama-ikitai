// src/components/provider/modalStateStore.ts
import { create } from 'zustand';

type TagType = {
  key: string;
  value: string;
  label: string;
};

type ModalState = {
  filterValues: TagType[];
  modals: { [key: string]: boolean };
  openModal: (modalKey: string) => void;
  closeModal: (modalKey: string) => void;
  setFilterValues: (tag: TagType) => void;
  removeFilterValue: (tag: TagType) => void;
};

export const useModalState = create<ModalState>((set) => ({
  filterValues: [],
  modals: {},
  openModal: (modalKey: string) =>
    set((state) => ({ modals: { ...state.modals, [modalKey]: true } })),
  closeModal: (modalKey: string) =>
    set((state) => ({ modals: { ...state.modals, [modalKey]: false } })),
  setFilterValues: (tag: TagType) =>
    set((state) => ({ filterValues: [...state.filterValues, tag] })),
  removeFilterValue: (tag: TagType) =>
    set((state) => ({ filterValues: state.filterValues.filter((t) => t.value !== tag.value) })),
}));
