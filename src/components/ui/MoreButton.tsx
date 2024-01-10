import React from 'react';
import NextLink from 'next/link';
import {css} from 'styled-system/css';
import {SystemStyleObject} from 'styled-system/types';
import {Link} from '@mui/material';

interface ButtonProps {
  link: string;
  label: string;
  style?: SystemStyleObject;
  onClick?: () => void;
}

const MoreButton: React.FC<ButtonProps> = ({link, label, style, onClick}) => {
  const defaultStyle: SystemStyleObject = {
    marginLeft: '10px',
    marginRight: '10px',
    backgroundColor: '#367B9D',
    color: '#FFF',
    height: '40px',
    borderRadius: '5px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    mt: '0.8rem',
    border: '1px solid #367B9D',
    fontWeight: 'bold',
  };

  const combinedStyle = {...defaultStyle};

  return (
    <Link component={NextLink} onClick={onClick} href={link} sx={{width: '100%', textDecoration: 'none', '&:hover': {textDecoration: 'none'}}}>
      <div className={css({...combinedStyle, ...style})}>
        <div>{label}</div>
      </div>
    </Link>
  );
};

export default MoreButton;
