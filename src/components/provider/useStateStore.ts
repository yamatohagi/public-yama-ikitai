import {useState} from 'react';

function useLocalStorageState<T>(key: string, initialValue: T) {
  // ステートの初期値を取得する関数
  const getStoredValue = () => {
    const storedValue = localStorage.getItem(key);
    if (storedValue) {
      return JSON.parse(storedValue) as T;
    }
    return initialValue;
  };

  // ステートを定義
  const [state, setState] = useState<T>(getStoredValue);

  // ステートを設定する関数をオーバーライド
  const setStoredState = (value: T | ((val: T) => T)) => {
    const newValue = value instanceof Function ? value(state) : value;
    localStorage.setItem(key, JSON.stringify(newValue));
    setState(newValue);
  };

  return [state, setStoredState] as const;
}

export default useLocalStorageState;
