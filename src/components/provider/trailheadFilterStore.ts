/* eslint-disable @typescript-eslint/no-unused-vars */
import {create} from 'zustand';
import {createJSONStorage, persist} from 'zustand/middleware';

type ValueLabelType = {
  value: string | string[];
  label: string | string[];
};

type Store = {
  filteredValues: Record<string, ValueLabelType>; // トリガー後に更新される
  liveFilterValues: Record<string, ValueLabelType>; // リアルタイムで更新
  setLiveValue: (key: string, valueLabel: ValueLabelType) => void;
  removeLiveValue: (key: string) => void;
  resetLiveValuesByKey: (keys?: string[]) => void;
  applyFilters: () => void;
  getLiveValueByKey: (key: string) => string | string[];
  getLiveLabelsByKey: (key: string) => string | string[];
  setLiveValueByKey: (key: string, valueLabel: ValueLabelType) => void;
  liveState: (key: string) => [string | string[], (newValue: string | string[], newLabel: string | string[]) => void, string | string[]];
};

const createPersisted = (name: string) =>
  persist<Store>(
    (set, get) => ({
      filteredValues: {},
      liveFilterValues: {},
      setLiveValue: (key: string, valueLabel: ValueLabelType) => {
        if (valueLabel.value === '' || (Array.isArray(valueLabel.value) && valueLabel.value.length === 0)) {
          const {[key]: _, ...rest} = get().liveFilterValues;
          set({liveFilterValues: rest});
        } else {
          set((state) => ({
            liveFilterValues: {
              ...state.liveFilterValues,
              [key]: valueLabel,
            },
          }));
        }
      },
      removeLiveValue: (key: string) => {
        const {[key]: _, ...rest} = get().liveFilterValues;
        set({liveFilterValues: rest});
      },
      resetLiveValuesByKey: (keys?: string[]) => {
        if (keys) {
          const newLiveFilterValues = {...get().liveFilterValues};
          keys.forEach((key) => {
            delete newLiveFilterValues[key];
          });
          set({liveFilterValues: newLiveFilterValues});
        } else {
          set({liveFilterValues: {}});
        }
      },
      applyFilters: () => {
        set((state) => ({
          filteredValues: state.liveFilterValues,
        }));
      },
      getLiveValueByKey: (key: string) => get().liveFilterValues[key]?.value || '',
      getLiveLabelsByKey: (key: string) => get().liveFilterValues[key]?.label || '',
      setLiveValueByKey: (key: string, valueLabel: ValueLabelType) => {
        if (valueLabel.value === '' || (Array.isArray(valueLabel.value) && valueLabel.value.length === 0)) {
          const {[key]: _, ...rest} = get().liveFilterValues;
          set({liveFilterValues: rest});
        } else {
          set((state) => ({
            liveFilterValues: {
              ...state.liveFilterValues,
              [key]: valueLabel,
            },
          }));
        }
      },
      liveState: (key: string) => {
        const value = get().liveFilterValues[key]?.value || '';
        const labelValue = get().liveFilterValues[key]?.label || '';

        const setValue = (newValue: string | string[], newLabel: string | string[]) => {
          if (newValue === '' || (Array.isArray(newValue) && newValue.length === 0)) {
            const {[key]: _, ...rest} = get().liveFilterValues;
            set({liveFilterValues: rest});
          } else {
            set((state) => ({
              liveFilterValues: {
                ...state.liveFilterValues,
                [key]: {value: newValue, label: newLabel},
              },
            }));
          }
        };

        return [value, setValue, labelValue];
      },
    }),
    {
      name,
      storage: createJSONStorage(() => sessionStorage),
    }
  );

export const useTrailheadFilterStore = create(createPersisted('trailheadFilterStore'));
