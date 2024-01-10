import {CSSProperties, ReactElement} from 'react';
import {css} from 'styled-system/css';

type AuxiliaryButtonProps = {
  title: string | ReactElement;
  border?: boolean;
  onClick?: (v?: any) => void;
  style?: CSSProperties;
};
const AuxiliaryButton = (props: AuxiliaryButtonProps) => {
  const {title, onClick, border = true, style} = props;
  return (
    <button
      type="button"
      onClick={onClick}
      className={css({
        margin: '0 5px 0 0',
        alignItems: 'flex-end',
        border: border ? '2.5px solid #367B9D' : '',
        borderRadius: '6px',
        color: '#367B9D',
        fontWeight: 'semibold',
        paddingLeft: '0.4rem',
        paddingRight: '0.4rem',
        fontSize: '0.8rem',
      })}
      style={style}
    >
      {title}
    </button>
  );
};

export default AuxiliaryButton;
