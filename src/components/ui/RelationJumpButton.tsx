import {Link} from '@mui/material';
import NextLink from 'next/link';
import {css} from 'styled-system/css';
import {SystemStyleObject} from 'styled-system/types';
import {CSSProperties} from 'react';
import Iconify from '../iconify';

export default function RelationJumpButton({label, link, style}: {label: string; link: string; style?: CSSProperties}) {
  const defaultStyle: SystemStyleObject = {
    marginLeft: '10px',
    marginRight: '10px',
    px: 5,
    backgroundColor: '#367B9D',
    color: '#FFF',
    height: '30px',
    borderRadius: '5px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,

    border: '1px solid #367B9D',
    fontWeight: 'bold',
  };

  const combinedStyle = {...defaultStyle};
  return (
    <Link component={NextLink} href={link} target="_blank" sx={{width: '200px', textDecoration: 'none', '&:hover': {textDecoration: 'none'}}}>
      <div className={css({...combinedStyle, ...style})}>
        <div>{label}</div>
        <Iconify icon="ooui:new-window-ltr" width={21} className={css({ml: 2})} style={{...style}} />
      </div>
    </Link>
  );
}
