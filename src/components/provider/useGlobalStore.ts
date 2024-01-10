import {create} from 'zustand';
import {persist, createJSONStorage} from 'zustand/middleware';

type GlobalState<T> = {
  value: T;
  setValue: (newValue: T) => void;
};

const createPersistedGlobalStore = <T>(key: string, initialValue: T) =>
  create(
    persist<GlobalState<T>>(
      (set) => ({
        value: initialValue,
        setValue: (newValue: T) => set({value: newValue}),
      }),
      {
        name: `globalStore-${key}`,
        storage: createJSONStorage(() => sessionStorage),
      }
    )
  );

const storeMap: Map<string, any> = new Map();

export function useGlobalState<T>(key: string, initialValue: T): [T, (newValue: T) => void] {
  if (!storeMap.has(key)) {
    storeMap.set(key, createPersistedGlobalStore<T>(key, initialValue));
  }

  const useStore = storeMap.get(key);

  const value: T = useStore((state: GlobalState<T>) => state.value);
  const setValue = useStore((state: GlobalState<T>) => state.setValue);

  return [value, setValue];
}
