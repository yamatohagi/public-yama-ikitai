import { Slider } from '@mui/material';
import { memo, useState } from 'react';
import { css } from 'styled-system/css';

// 上限と下限
const marks = [
  {
    value: 0,
    label: '0', // 最小値
  },
  {
    value: 4000,
    label: '4000', // 最大値
  },
];

function MtPeakSlider() {
  const minDistance = 20;
  const [value, setValue] = useState<number[]>([1000, 3000]);
  const handleChange = (event: Event, newValue: number | number[], activeThumb: number) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (activeThumb === 0) {
      setValue([Math.min(newValue[0], value[1] - minDistance), value[1]]);
    } else {
      setValue([value[0], Math.max(newValue[1], value[0] + minDistance)]);
    }
  };

  return (
    <div className={css({ marginLeft: '20px', marginRight: '20px' })}>
      <div
        id="range-slider"
        className={css({
          marginBottom: '20px',
          fontSize: '0.91rem',
          alignItems: 'left',
          color: '#367b9d',
          fontWeight: 'semibold',
        })}
      >
        標高
      </div>
      <div className={css({ marginLeft: '7px', marginRight: '7px' })}>
        <Slider
          getAriaLabel={() => 'Minimum distance'}
          value={value}
          min={0} // スライダーの最小値
          max={4000} // スライダーの最大値
          onChange={handleChange}
          valueLabelDisplay="auto"
          valueLabelFormat={(value) => `${value}m`}
          marks={marks}
          step={200}
          sx={{
            // マークのラベルの位置を上部に設定
            '& .MuiSlider-markLabel': {
              // translateXも-19にしたい
              fontWeight: 'bold',
              color: '#737272', // 文字色
              fontSize: '0.91rem',
              transform: 'translateX(-50%) translateY(-51px)',
            },
            '& .MuiSlider-thumb': {
              // color: '#749761',
            },
            '& .MuiSlider-track': {
              color: '#666',
              height: '6px',
            },
            '& .MuiSlider-rail': {
              color: '#333',
              height: '6px',
              borderRadius: '0px',
            },
            '& .MuiSlider-mark': {
              display: 'none',
              color: '#333',
            },
          }}
        />
      </div>
    </div>
  );
}

export default memo(MtPeakSlider);
