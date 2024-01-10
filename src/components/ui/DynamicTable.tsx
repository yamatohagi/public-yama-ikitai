import React, {memo, ReactNode} from 'react';
import {css} from 'styled-system/css';

export type TableData = {
  key: ReactNode;
  value: ReactNode;
}[][];

interface DynamicTableProps {
  data?: TableData;
}

const DynamicTable: React.FC<DynamicTableProps> = ({data}) => {
  if (!data) return null;
  const maxRow = Math.max(...data.map((row) => row.length));
  // const maxCol = data.length;

  return (
    <table className={tableStyle}>
      <tbody>
        {Array.from({length: maxRow}).map((_, rowIndex) => (
          <tr key={rowIndex}>
            {data.map((row, cellIndex) => (
              <React.Fragment key={cellIndex}>
                <td>{row[rowIndex]?.key || ''}</td>
                <td>{row[rowIndex]?.value || '-'}</td>
              </React.Fragment>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
export default memo(DynamicTable);

const tableStyle = css({
  width: '100%',
  borderCollapse: 'separate', // add this line
  borderRadius: '3px',
  borderSpacing: '0',

  borderLeft: '0.05rem solid #C8C8C8',
  borderTop: '0.05rem solid #C8C8C8',

  '& tr > *': {
    padding: '5px 3px',

    borderRight: '0.05rem solid #C8C8C8',
    borderBottom: '0.05rem solid #C8C8C8',
  },
  '& tr:first-child > *:first-child': {
    borderRadius: '3px 0 0 0',
  },
  '& tr:first-child > *:last-child': {
    borderRadius: '0 3px 0 0',
  },
  '& tr:last-child > *:first-child': {
    borderRadius: '0 0 0 3px',
  },
  '& tr:last-child > *:last-child': {
    borderRadius: '0 0 3px 0',
  },
});
