import {create} from 'zustand';

type GlobalState<T> = {
  value: T;
  setValue: (newValue: T) => void;
};

// セッションストレージに保存しないバージョンのグローバルストアを作成
const createNonPersistedGlobalStore = <T>(initialValue: T) =>
  create<GlobalState<T>>((set) => ({
    value: initialValue,
    setValue: (newValue: T) => set({value: newValue}),
  }));

const storeMap: Map<string, any> = new Map();

export function useGlobalStoreNotSave<T>(key: string, initialValue: T): [T, (newValue: T) => void] {
  if (!storeMap.has(key)) {
    storeMap.set(key, createNonPersistedGlobalStore<T>(initialValue));
  }

  const useStore = storeMap.get(key);

  const value: T = useStore((state: GlobalState<T>) => state.value);
  const setValue = useStore((state: GlobalState<T>) => state.setValue);

  return [value, setValue];
}
