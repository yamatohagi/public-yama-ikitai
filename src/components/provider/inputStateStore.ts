// src/components/provider/inputStateStore.ts
import {create} from 'zustand';

type InputState = {
  keyword: string;
  setKeyword: (value: string) => void;
};

const createStore = () =>
  create<InputState>((set) => ({
    keyword: '',
    setKeyword: (value: string) => set({keyword: value}),
  }));

// Stores will be stored in a Map data structure.
const storeMap = new Map<string, ReturnType<typeof createStore>>();

export function useKeyedInputStore(key: string) {
  if (!storeMap.has(key)) {
    storeMap.set(key, createStore());
  }

  const useStore = storeMap.get(key)!; // The ! is used to assert that the value will be defined

  const keyword = useStore((state) => state.keyword);
  const setKeyword = useStore((state) => state.setKeyword);

  return {keyword, setKeyword};
}
