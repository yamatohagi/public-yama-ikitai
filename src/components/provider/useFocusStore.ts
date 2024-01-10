// src/stores/focusStore.ts
import {create} from 'zustand';

type FocusProps = {
  [key: string]: any;
};

type FocusStore = {
  shouldFocus: boolean;
  focusProps: FocusProps | null;
  triggerFocus: (props?: FocusProps | null) => void;
  resetFocus: () => void;
};

export const useFocusStore = create<FocusStore>((set) => ({
  shouldFocus: false,
  focusProps: null,
  triggerFocus: (props = null) => set({shouldFocus: true, focusProps: props}),
  resetFocus: () => set({shouldFocus: false, focusProps: null}),
}));
