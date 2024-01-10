// src/components/provider/snackbarStore.ts
import { create } from 'zustand';
import { IconButtonTypeMap } from '@mui/material';

type Store = {
  open: boolean;
  message: string;
  color?: IconButtonTypeMap['props']['color'];
  handleClose: () => void;
  handleOpen: (payload: { message: string; color?: IconButtonTypeMap['props']['color'] }) => void;
};

export const useSnackbarStore = create<Store>((set) => ({
  open: false,
  message: '',
  color: undefined,
  handleClose: () => set({ open: false }),
  handleOpen: (payload: { message: string; color?: IconButtonTypeMap['props']['color'] }) =>
    set({ open: true, message: payload.message, color: payload.color }),
}));
