import {LoadingButton} from '@mui/lab';
import {Dialog, DialogContent, DialogActions, Button, Grid, RadioGroup, FormControlLabel, Radio} from '@mui/material';
import {Box, styled} from '@mui/system';
import {memo, useState} from 'react';
import {createModalAtom, useModalState} from 'src/components/provider/useModalStateJotai';
import {useAuth} from 'src/hooks/use-auth';
import {trpc} from 'src/utils/trpc';
import {useAtom} from 'jotai';
import {css} from 'styled-system/css';
import {MtTrailHeadRatingTimeStampAtom} from './itam/state';

const StyledDialog = styled(Dialog)(({theme}) => ({
  '& .MuiBackdrop-root': {
    backgroundColor: 'rgba(0, 0, 0, 0.15)', // 透明度を0.5に設定
  },
}));

export const MtThRatingPostModalAtom = createModalAtom<{
  trailheadRatingId?: number;
  featureType: string;
  trailheadId: number;
}>();

const MtThRatingPostModal = () => {
  const mtFeatureRatingPost = trpc.mtThRating.post.useMutation();
  const {userId} = useAuth();
  const [, setMtTrailHeadRatingTimeStamp] = useAtom(MtTrailHeadRatingTimeStampAtom);

  const [isSubmitting, setIsSubmitting] = useState(false);
  // 検索候補を格納するState
  const [selectedValue, setSelectedValue] = useState<string>('0');

  const {modalProps, isOpen, closeModal} = useModalState(MtThRatingPostModalAtom);

  const featureType = modalProps?.featureType || null;

  const handleClose = () => closeModal();

  const handleSearch = () => {
    if (!featureType || !userId) return;
    setIsSubmitting(true);

    mtFeatureRatingPost.mutate(
      {
        trailheadId: modalProps?.trailheadId,
        rating: Number(selectedValue),
        featureType,
        userId,
      },
      {
        onSuccess: (data) => {
          // mutateが成功した後の処理
          setMtTrailHeadRatingTimeStamp(Date.now());
          handleClose(); // モーダルを閉じる
          setIsSubmitting(false); // ボタンを再度有効化
        },
        onError: (error) => {
          // エラーハンドリング
          console.error('Error posting rating:', error);
          setIsSubmitting(false); // エラーが発生した場合もボタンを再度有効化
        },
      }
    );
  };

  return (
    <div>
      <StyledDialog open={isOpen} keepMounted onClose={handleClose}>
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
          <Button onClick={handleClose} color="secondary" sx={{flex: 10, fontSize: '0.7rem'}} size="large" variant="outlined">
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
export default memo(MtThRatingPostModal);
