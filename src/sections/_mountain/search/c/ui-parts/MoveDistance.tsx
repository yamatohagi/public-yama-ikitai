import {memo, useEffect} from 'react';
import {css} from 'styled-system/css';
import {useMtFilterStore} from 'src/components/provider/mtFilterStore';
import {useRangeInputStyle} from './hooks/useRangeInputStyle';

function MoveDistance() {
  /* 宣言 */
  const {liveState, applyFilters} = useMtFilterStore();
  const [selectedR, setSelectedR] = liveState('trailheadDistanceTimeMax');

  const {style: styleR} = useRangeInputStyle(selectedR.toString());

  useEffect(() => {
    handleFilterR();
  }, [selectedR]);

  /* handle */
  const handleFilterR = () => {
    applyFilters();
  };

  return (
    <div className={buttonDivStyleCommon}>
      <div className={css({justifyContent: 'flex-start', width: ''})}>
        <span
          className={css({
            fontSize: '0.88rem',
            marginTop: '3px', // 地域が真ん中に来るように調整
            color: '#367b9d', // 地域の文字色
            marginLeft: '10px', // 地域の左の余白
            fontWeight: 'semibold', // 地域の文字の太さ
          })}
        >
          移動時間
        </span>
      </div>
      <div className={css({justifyContent: 'flex-end'})}>
        <select name="pets" className={selectStyleR} onChange={(e) => setSelectedR(e.target.value, e.target.value)} style={styleR} value={selectedR}>
          <option value="">選択する</option>
          {options.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default memo(MoveDistance);

const interval = 60; // 時間間隔（分）
const maxHours = 15; // 最大時間数
const options = Array.from({length: maxHours}, (_, index) => {
  const hours = Math.floor(((index + 1) * interval) / 60);
  const minutes = ((index + 1) * interval) % 60;
  const timeLabel = `約${hours}時間 ${minutes !== 0 ? `${minutes}分` : ''}`;
  return {
    label: timeLabel,
    value: `${(index + 1) * interval}`,
  };
});

const selectStyleR = css({
  textAlign: 'center',
  padding: '0 0.8rem 0 0',
  margin: '0 18px 0 1px',
  fontSize: '0.88rem',
  appearance: 'none',
  background:
    "transparent url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='2' height='2' viewBox='0 0 2 1.5'><path d='M0,0 L2,0 L1,1 z' fill='%23367b9d' /></svg>\") no-repeat",
  backgroundPosition: 'right 0.0em top 60%, 0 0',
  backgroundSize: '.65em auto, 100%',
  _focus: {
    outline: 'none',
  },
});

const buttonDivStyleCommon = css({
  marginLeft: '2px',
  marginRight: '20px',
  marginTop: '7px',
  border: '#eee 3px solid',
  borderRadius: '8px', // box自体の角の丸み
  backgroundColor: 'white', // box自体の背景色,グレーなので
  display: 'flex',
  alignItems: 'center', // 縦方向の位置を中央に
  height: '54px',
  justifyContent: 'space-between',
});
