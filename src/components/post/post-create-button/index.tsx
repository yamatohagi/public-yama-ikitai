import Iconify from 'src/components/iconify';
import {css} from 'styled-system/css';
import {SystemStyleObject} from 'styled-system/types';

type PostCreateButtonProps = {
  onClick: () => void;
};
export default function PostCreateButton({onClick}: PostCreateButtonProps) {
  return (
    <div className={css({display: 'flex'})}>
      <button type="button" className={buttonStyle({mr: '0.5rem', backgroundColor: '#367B9D', color: '#FFF'})} onClick={onClick}>
        <div className={css({marginTop: '0.1rem', display: 'flex'})}>
          <div className={css({alignItems: 'center', display: 'flex', margin: 'auto'})}>
            <Iconify icon="ic:outline-add-photo-alternate" width={20} className={css({mr: '0.3rem'})} />
            <div> 投稿する</div>
          </div>
        </div>
      </button>
    </div>
  );
}
const buttonStyle = (other?: SystemStyleObject) =>
  css({
    flex: 1,
    mt: '0.8rem',
    borderRadius: '40px', // 外枠を丸くする
    border: '1px solid #367B9D',
    backgroundColor: '',
    color: '#367B9D',
    fontWeight: 'bold',
    ...other,
  });
