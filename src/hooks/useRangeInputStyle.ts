// hooks/useRangeInputStyle.ts
import {useState, useEffect, CSSProperties} from 'react';

const unSelectStyle = {color: '#757580', fontWeight: '600'};
const selectedStyle = {color: 'black', fontWeight: '600'};

export const useRangeInputStyle = (selected: string | string[]) => {
  const [style, setStyle] = useState<CSSProperties>(unSelectStyle);

  useEffect(() => {
    setStyle(selected === '' ? unSelectStyle : selectedStyle);
  }, [selected]);

  return {style};
};
