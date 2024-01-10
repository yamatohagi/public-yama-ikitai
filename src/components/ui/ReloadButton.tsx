import {css} from 'styled-system/css';

import {CSSProperties} from 'react';
import Iconify from '../iconify';

export default function ReloadButton({reload, style}: {reload: VoidFunction; style?: CSSProperties}) {
  return (
    <button type="button" style={{...style}} onClick={reload}>
      <Iconify icon="ooui:reload" width={25} className={css({})} />
    </button>
  );
}
