import {LoadingButton} from '@mui/lab';
import {Dialog, DialogContent, DialogActions, Button, Grid, RadioGroup, FormControlLabel, Radio} from '@mui/material';
import {Box, styled} from '@mui/system';
import {MtFacility} from '@prisma/client';
import {useState} from 'react';
import {createModalAtom, useModalState} from 'src/components/provider/useModalStateJotai';
import {useSession} from 'next-auth/react';
import {useRouter} from 'next/router';

import {trpc} from 'src/utils/trpc';
import {paths} from 'src/routes/paths';
import {css} from 'styled-system/css';

const StyledDialog = styled(Dialog)(({theme}) => ({
  '& .MuiBackdrop-root': {
    backgroundColor: 'rgba(0, 0, 0, 0.15)', // 透明度を0.5に設定
  },
}));

export const NameInputModalAtom = createModalAtom<{mtFacilityId?: number; idName?: string; ratingColumnName: keyof MtFacility}>();

type RatingModalProps = {
  refresh: VoidFunction;
  title: string;
};
const RatingModal = ({refresh, title}: RatingModalProps) => {
  const mtFeatureRatingPost = trpc.ratingHistory.update.useMutation();
  const {data: session} = useSession();
  const userId = session?.user?.id;
  const router = useRouter();

  const [isSubmitting, setIsSubmitting] = useState(false);
  // 検索候補を格納するState
  const [selectedValue, setSelectedValue] = useState<string>('0');

  const {modalProps, closeModal} = useModalState(NameInputModalAtom);

  const {mtFacilityId, idName, ratingColumnName} = modalProps;

  const handleClose = () => closeModal();

  const handleSearch = () => {
    if (!mtFacilityId || !idName || !ratingColumnName) return;

    if (!userId) {
      router.push(paths.login.path);
      return;
    }

    setIsSubmitting(true);
    // ここで必要なデータを渡してmutateを呼び出します。
    mtFeatureRatingPost.mutate(
      {
        rating: Number(selectedValue),
        mtFacilityId: Number(mtFacilityId),
        idName,
        ratingColumnName,
        userId,
      },
      {
        onSuccess: (data) => {
          // mutateが成功した後の処理
          setSelectedValue('0');
          // if (modalProps.refresh) modalProps.refresh();
          refresh();
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
      <StyledDialog open keepMounted onClose={handleClose}>
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
export default RatingModal;
