import {css} from 'styled-system/css';

interface OrderSelectboxProps<T extends string | undefined> {
  orderState: [T, (newValue: T) => void];
  options: {value: T; label: string}[];
}

function OrderSelectbox<T extends string | undefined>({orderState, options}: OrderSelectboxProps<T>) {
  // 並び順
  const [sortOrder, setSortOrder] = orderState;

  const handleSortOrderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOrder(e.target.value as T);
  };

  return (
    <div className={inputDivStyle}>
      <div>
        <span
          className={css({
            fontSize: '0.91rem',
            marginTop: '3px',
            color: '#367b9d',
            marginLeft: '10px',
            fontWeight: 'semibold',
          })}
        >
          並び順：
        </span>
      </div>
      <select id="name" className={inputStyle} value={sortOrder} onChange={handleSortOrderChange}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default OrderSelectbox;

const inputDivStyle = css({
  border: '#eee 3px solid',
  borderRadius: '8px', // box自体の角の丸み
  backgroundColor: 'white',
  mb: '20px',
  marginLeft: '20px',
  marginRight: '20px',
  display: 'flex',
  alignItems: 'center', // 縦方向の位置を中央に
});
const inputStyle = css({
  color: 'black',
  appearance: 'none',
  background:
    "transparent url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='2' height='2' viewBox='0 0 2 2'><path d='M0,0 L2,0 L1,1 z' fill='%23367b9d' /></svg>\") no-repeat",
  backgroundPosition: 'right 0.0em top 60%, 0 0',
  backgroundSize: '.65em auto, 100%',
  textAlign: 'left',
  marginLeft: '3px',
  width: '74%',
  height: '40px',
  transition: 'background-color 0.3s ease-in-out', // 追加のスタイル：トランジションの定義
  borderRadius: '8px',

  fontSize: '0.91rem', // 地域の文字の大きさ

  _focus: {
    outline: 'none',
  },
});
