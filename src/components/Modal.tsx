import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import {DialogProps} from '@mui/material/Dialog/Dialog';

import {MUIStyledCommonProps, styled} from '@mui/system';
import {memo} from 'react';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children?: React.ReactNode;
  // Omitを使ってDialogPropsからopenとonCloseプロパティを除外
  dialogProps?: Omit<DialogProps, 'open' | 'onClose'> & MUIStyledCommonProps;
  width?: string;
}

const StyledDialog = styled(Dialog)(({theme, width, fullWidth, fullScreen}: any) => ({
  '& .MuiBackdrop-root': {
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
  },
  ...(fullScreen && {
    '& .MuiDialog-paper': {
      [theme.breakpoints.down('sm')]: {
        margin: 0,
        width: width || '100%',
        maxHeight: '100vh',
      },
    },
  }),
  ...(fullWidth && {
    '& .MuiDialog-paper': {
      [theme.breakpoints.down('sm')]: {
        margin: 0,
        width: width || '100%',
      },
    },
  }),
}));

const MemoizedStyledDialog = memo(StyledDialog);

export default function Modal({open, onClose, title, children, dialogProps, width}: ModalProps) {
  return (
    <MemoizedStyledDialog open={open} keepMounted onClose={onClose} {...dialogProps}>
      <DialogContent>
        {title && <h2>{title}</h2>}
        {children}
      </DialogContent>
    </MemoizedStyledDialog>
  );
}
