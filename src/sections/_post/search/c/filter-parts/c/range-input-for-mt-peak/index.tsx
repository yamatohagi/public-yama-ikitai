import {memo, useEffect} from 'react';
import {css} from 'styled-system/css';
import {usePostFilterStore} from 'src/components/provider/postFilterStore';
import {useRangeInputStyle} from '../../../../../../../hooks/useRangeInputStyle';

function RangeInputForMtPeak() {
  /* 宣言 */
  const {liveState, applyFilters} = usePostFilterStore();
  const [valueR, setValueR] = liveState('mtPeakMax');
  const [valueL, setValueL] = liveState('mtPeakMin');

  const {style: styleR} = useRangeInputStyle(valueR);
  const {style: styleL} = useRangeInputStyle(valueL);

  useEffect(() => {
    applyFilters(); // 値が変わるたびにsubmit
  }, [valueR, valueL]);

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
          標高
        </span>
      </div>
      <div className={css({justifyContent: 'flex-end', width: '75%'})}>
        <select name="pets" className={selectStyleL} onChange={(e) => setValueL(e.target.value, e.target.value)} style={styleL} value={valueL}>
          <option value="">選択する</option>
          <option value="500">500m</option>
          <option value="1000">1000m</option>
          <option value="1500">1500m</option>
          <option value="2000">2000m</option>
          <option value="2500">2500m</option>
          <option value="3000">3000m</option>
          <option value="3500">3500m</option>
          <option value="4000">4000m</option>
        </select>
        <span className={css({margin: '0 20px 0 20px', color: '#757580'})}>〜</span>
        <select name="pets" className={selectStyleR} onChange={(e) => setValueR(e.target.value, e.target.value)} style={styleR} value={valueR}>
          <option value="">選択する</option>
          <option value="500">500m</option>
          <option value="1000">1000m</option>
          <option value="1500">1500m</option>
          <option value="2000">2000m</option>
          <option value="2500">2500m</option>
          <option value="3000">3000m</option>
          <option value="3500">3500m</option>
          <option value="4000">4000m</option>
        </select>
      </div>
    </div>
  );
}

export default memo(RangeInputForMtPeak);

const selectStyleL = css({
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
const selectStyleR = css({
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
