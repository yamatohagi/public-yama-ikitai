import {Theme} from '@mui/material/styles';
//

import Input from './Input';
import Skeleton from './Skeleton';

export default function ComponentsOverrides(theme: Theme) {
  return Object.assign(Input(theme), Skeleton(theme));
}
