import {forwardRef} from 'react';
import {Icon} from '@iconify/react';
// @mui
import Box from '@mui/system/Box';
//
import type {BoxProps} from '@mui/system';
import {IconifyProps} from './types';

interface Props extends BoxProps {
  icon: IconifyProps;
  className?: string;
}

const Iconify = forwardRef<SVGElement, Props>(({icon, width = 20, sx, className, ...other}, ref) => {
  // classNameが指定されている場合は、sxをnullまたは空オブジェクトに設定
  const appliedSx = className ? {} : {width, height: width, flexShrink: 0, ...sx};

  return <Box ref={ref} component={Icon} icon={icon} sx={appliedSx} {...other} className={className} />;
});

export default Iconify;
