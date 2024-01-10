// src/components/provider/selectedPrefectureStore.ts
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type Store = {
  selected: string[];
  setSelected: (prefectures: string[]) => void;
  deleteSelected: (prefecture: string) => void;
};

const createPersisted = (name: string) =>
  persist<Store>(
    (set) => ({
      selected: [],
      setSelected: (prefectures: string[]) =>
        set((state) => ({
          selected: Array.from(new Set([...state.selected, ...prefectures])),
        })),
      deleteSelected: (prefecture: string) =>
        set((state) => ({
          selected: state.selected.filter((p) => p !== prefecture),
        })),
    }),
    {
      name,
      storage: createJSONStorage(() => sessionStorage),
    }
  );

export function useKeyedSelectedStore(key: string) {
  const useStore = create(createPersisted(key));

  const selected = useStore((state) => state.selected);
  const setSelected = useStore((state) => state.setSelected);
  const deleteSelected = useStore((state) => state.deleteSelected);

  return { selected, setSelected, deleteSelected };
}
