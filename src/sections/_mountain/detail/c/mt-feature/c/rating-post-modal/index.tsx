import {LoadingButton} from '@mui/lab';
import {Dialog, DialogContent, DialogActions, Button, Grid, RadioGroup, FormControlLabel, Radio} from '@mui/material';
import {Box, styled} from '@mui/system';
import {memo, useState} from 'react';
import {createModalAtom, useModalState} from 'src/components/provider/useModalStateJotai';
import {useAuth} from 'src/hooks/use-auth';
import {css} from 'styled-system/css';
import {PostRating} from './api';

const StyledDialog = styled(Dialog)(({theme}) => ({
  '& .MuiBackdrop-root': {
    backgroundColor: 'rgba(0, 0, 0, 0.15)', // 透明度を0.5に設定
  },
}));

export const RatingPostModalAtom = createModalAtom<{mountainFeatureId?: number; featureName?: string}>();

const RatingPostModal = () => {
  const {loginCheck} = useAuth();
  // 検索候補を格納するState
  const [selectedValue, setSelectedValue] = useState<string>('0');

  const {modalProps, isOpen, closeModal} = useModalState(RatingPostModalAtom);
  const {post: postRating, isSubmitting} = PostRating({closeModal});

  const mountainFeatureId = modalProps?.mountainFeatureId || null;
  const featureName = modalProps?.featureName || null;

  const handleSearch = () => {
    if (!mountainFeatureId || !featureName) return;
    const userId = loginCheck();
    if (!userId) return;

    postRating.mutate({
      rating: Number(selectedValue),
      mountainFeatureId: Number(mountainFeatureId),
      featureName,
      userId,
    });
  };

  return (
    <div>
      <StyledDialog open={isOpen} keepMounted onClose={closeModal}>
        <DialogContent>
          <Box mt={4}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12}>
                <RadioGroup
                  row // これにより、ラジオボタンが横並びになります
                  value={selectedValue}
                  onChange={(e) => setSelectedValue(e.target.value)}
                >
                  {['0', '1', '2', '3'].map((value) => (
                    <FormControlLabel key={value} value={value} control={<Radio color="primary" />} label={value} />
                  ))}
                </RadioGroup>
              </Grid>
            </Grid>
          </Box>
        </DialogContent>

        <DialogActions>
          <Button onClick={closeModal} color="secondary" sx={{flex: 10, fontSize: '0.7rem'}} size="large" variant="outlined">
            キャンセル
          </Button>

          <LoadingButton
            className={css({
              background: '#367B9D',
            })}
            loading={isSubmitting} // isLoadingまたはisSubmittingの場合、スピナーを表示
            onClick={handleSearch}
            fullWidth
            color="secondary"
            sx={{flex: 10}}
            size="large"
            variant="contained"
          >
            投票
          </LoadingButton>
        </DialogActions>
      </StyledDialog>
    </div>
  );
};
export default memo(RatingPostModal);
