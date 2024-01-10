import React, {CSSProperties, forwardRef} from 'react';

interface TabProps {
  label: string;
  value: string;
  activeTab: string;
  onClick: (value: string) => void;
  style?: CSSProperties;
  activeStyle?: CSSProperties;
}

const Tab = forwardRef<HTMLDivElement, TabProps>((props, ref) => {
  const {label, value, activeTab, onClick, style, activeStyle} = props;

  const handleClick = () => {
    onClick(value);
  };

  const defaultStyle: CSSProperties = {
    borderBottom: '2px solid transparent',
    whiteSpace: 'nowrap',
    marginRight: '1.1rem',
    transition: 'border-color 0.3s, color 0.3s, transform 0.3s', // アニメーションを追加
    fontWeight: 'bold',
    color: '#4A4A4A',
    transform: 'translateY(0)',
  };

  const defaultActiveStyle: CSSProperties = {
    whiteSpace: 'nowrap',
    marginRight: '1.1rem',
    borderBottom: '2px solid #367B9D',
    transform: 'translateY(-1px)',
    transition: 'border-color 0.3s, color 0.3s, transform 0.3s', // アニメーションを追加
    color: '#367B9D',
  };

  const mergedStyle = {
    ...defaultStyle,
    ...style,
    ...(value === activeTab ? {...defaultActiveStyle, ...activeStyle} : {}),
  };

  return (
    <div style={{position: 'relative'}} ref={ref}>
      <button type="button" style={mergedStyle} onClick={handleClick}>
        {label}
      </button>
    </div>
  );
});

export default Tab;
