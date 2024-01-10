import React from 'react';

interface EmptyDataProps {
  children?: React.ReactNode;
}

export default function EmptyData({children}: EmptyDataProps) {
  return (
    <div>
      <div>結果がありません</div>
      {children && <div>{children}</div>}
    </div>
  );
}
