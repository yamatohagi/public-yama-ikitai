import {css} from 'styled-system/css';
import {SystemStyleObject} from 'styled-system/types';
import Iconify from 'src/components/iconify/Iconify';

type RoundButtonProps = {
  icon?: string;
  text: string;
  backgroundColor?: string;
  color?: string;
  onClick?: (v?: any) => void;
  styleProps?: SystemStyleObject;
  iconOnRight?: boolean; // アイコンを右に表示するためのオプション
};

const RoundButton = ({icon, text, backgroundColor, color, onClick, styleProps, iconOnRight}: RoundButtonProps) => (
  <button type="button" className={buttonStyle({backgroundColor, color, ...styleProps})} onClick={onClick}>
    <div className={css({marginTop: '0.1rem', display: 'flex'})}>
      <div className={css({alignItems: 'center', display: 'flex', margin: 'auto'})}>
        {!iconOnRight && icon && <Iconify icon={icon} width={20} className={css({mr: '0.3rem', color})} />}
        <div>{text}</div>
        {iconOnRight && icon && <Iconify icon={icon} width={20} className={css({ml: '0.3rem', color})} />}
      </div>
    </div>
  </button>
);

export default RoundButton;

const buttonStyle = (other?: SystemStyleObject) =>
  css({
    flex: 1,
    mt: '0.8rem',
    borderRadius: '40px',
    border: '1px solid #367B9D',
    fontWeight: 'bold',
    ...other,
  });
