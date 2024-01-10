import {Slide} from '@mui/material';
import {TransitionProps} from '@mui/material/transitions';
import React from 'react';

export const ModalSlideTransition = React.forwardRef(
  (
    props: TransitionProps & {
      children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>
  ) => <Slide direction="up" ref={ref} {...props} />
);
