import {memo, useEffect} from 'react';
import {useMtFilterStore} from 'src/components/provider/mtFilterStore';
import {css} from 'styled-system/css';
import {useRangeInputStyle} from './hooks/useRangeInputStyle';

function RangeInputForUphillTime() {
  /* 宣言 */
  const {liveState, applyFilters} = useMtFilterStore();

  const [selectedR, setSelectedR] = liveState('uphillTimeMax');
  const [selectedL, setSelectedL] = liveState('uphillTimeMin');

  const {style: styleR} = useRangeInputStyle(selectedR.toString());
  const {style: styleL} = useRangeInputStyle(selectedL.toString());

  useEffect(() => {
    handleFilterR();
  }, [selectedR]);
  useEffect(() => {
    handleFilterL();
  }, [selectedL]);

  /* handle */
  const handleFilterR = () => {
    applyFilters();
  };
  const handleFilterL = () => {
    applyFilters();
  };

  return (
    <div className={inputDivStyle} style={{}}>
      <div className={css({justifyContent: 'flex-start', width: '25%'})}>
        <span
          className={css({
            fontSize: '0.91rem', // 地域の文字の大きさ
            marginTop: '3px', // 地域が真ん中に来るように調整
            color: '#367b9d', // 地域の文字色
            marginLeft: '10px', // 地域の左の余白
            fontWeight: 'semibold', // 地域の文字の太さ
          })}
        >
          山頂まで
        </span>
      </div>
      <div className={css({justifyContent: 'flex-end', width: '75%'})}>
        <select name="pets" className={selectStyle} onChange={(e) => setSelectedL(e.target.value, e.target.value)} style={styleL} value={selectedL}>
          <option value="">選択する</option>
          {options.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <span className={css({margin: '0 20px 0 20px', color: '#757580'})}>〜</span>
        <select name="pets" className={selectStyleL} onChange={(e) => setSelectedR(e.target.value, e.target.value)} style={styleR} value={selectedR}>
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

export default memo(RangeInputForUphillTime);

const interval = 60; // 時間間隔（分）
const maxHours = 5; // 最大時間数
const options = Array.from({length: maxHours}, (_, index) => {
  const hours = Math.floor(((index + 1) * interval) / 60);
  const minutes = ((index + 1) * interval) % 60;
  const timeLabel = `${hours}時間 ${minutes !== 0 ? `${minutes}分` : ''}`;
  return {
    label: timeLabel,
    value: `${(index + 1) * interval}`,
  };
});

const selectStyle = css({
  textAlign: 'right',
  padding: '0 1.0em 0 1em',
  margin: '0 5px 0 0px',
  fontSize: '0.91rem',
  minWidth: '70px',
  appearance: 'none',
  background:
    "transparent url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='2' height='2' viewBox='0 0 2 1.5'><path d='M0,0 L2,0 L1,1 z' fill='%23367b9d' /></svg>\") no-repeat",
  backgroundPosition: 'right 0.0em top 60%, 0 0',
  backgroundSize: '.65em auto, 100%',
  _focus: {
    outline: 'none',
  },
});
const selectStyleL = css({
  textAlign: 'right',
  padding: '0 1.0em 0 0',
  margin: '0 10px 0 10px',
  fontSize: '0.91rem',
  minWidth: '70px',
  appearance: 'none',
  background:
    "transparent url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='2' height='2' viewBox='0 0 2 1.5'><path d='M0,0 L2,0 L1,1 z' fill='%23367b9d' /></svg>\") no-repeat",
  backgroundPosition: 'right 0.0em top 60%, 0 0',
  backgroundSize: '.65em auto, 100%',
  _focus: {
    outline: 'none',
  },
});

const inputDivStyle = css({
  height: '54px',
  marginTop: '7px',
  border: '#eee 3px solid',
  borderRadius: '8px', // box自体の角の丸み
  backgroundColor: 'white',
  marginLeft: '20px',
  marginRight: '20px',
  display: 'flex',
  alignItems: 'center', // 縦方向の位置を中央に
  justifyContent: 'space-between',
});
