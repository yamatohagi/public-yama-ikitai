import {LoadingButton} from '@mui/lab';
import {DialogActions, Button, Grid, Typography, Skeleton} from '@mui/material';
import {useSession} from 'next-auth/react';
import {useRouter} from 'next/router';
import FormProvider from 'src/components/hook-form/FormProvider';
import useResponsive from 'src/hooks/useResponsive';
import {RHFTextArea} from 'src/components/hook-form';
import {css} from 'styled-system/css';
import {paths} from 'src/routes/paths';
import useMtFacilityForm, {FormInputType} from './hooks';
import {EditModalState} from './state';
import {UpdateMountainFeature} from './api';

export type FacilitySpecificEditModalProps = {
  modalState: ReturnType<typeof EditModalState>;
};

function MtFeatureEditModalInner({modalState}: FacilitySpecificEditModalProps) {
  const router = useRouter();
  const mtId = Number(router.query.id);
  const {closeModal} = modalState;
  const isMdUp = useResponsive('up', 'md');

  const methods = useMtFacilityForm({mtId, modalState});
  const {
    handleSubmit,
    formState: {isSubmitting, isLoading},
  } = methods;
  const {data: session} = useSession();
  const userId = session?.user?.id;

  const {update} = UpdateMountainFeature({closeModal});

  const onSubmit = async (formValue: FormInputType) => {
    const {remarkColumName} = modalState.modalProps;
    try {
      if (!remarkColumName) return;

      if (!userId) {
        router.push(paths.login.path);
        return;
      }

      await update.mutateAsync({
        mtId,
        remark: {
          columnName: remarkColumName,
          value: formValue.remark,
        },
        userId,
      });
    } catch (error) {
      alert(`Error :${error?.toString()}`);
    }
  };
  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <div className={css({pt: 7})}>
        <Grid item xs={12} sm={12} sx={{mt: 1.5}}>
          <Typography variant={isMdUp ? 'subtitle1' : 'h5'} color="#323232" align="left" sx={{mb: 1}}>
            {`「${modalState.modalProps.featureName}」の情報編集`}
          </Typography>
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} sx={{mt: 1.5}}>
            <Typography variant={isMdUp ? 'subtitle1' : 'subtitle2'} color="#323232" align="left" sx={{mb: 0.5}}>
              山ノート
            </Typography>
            {isLoading ? <Skeleton variant="rounded" width="95%" height="10.5rem" /> : <RHFTextArea size="small" name="remark" rows={8} />}
          </Grid>
        </Grid>
      </div>

      <DialogActions>
        <Button onClick={closeModal} color="secondary" sx={{flex: 10, fontSize: '0.7rem'}} size="large" variant="outlined">
          キャンセル
        </Button>

        <LoadingButton
          className={css({
            background: '#367B9D',
          })}
          loading={isSubmitting} // isLoadingまたはisSubmittingの場合、スピナーを表示
          type="submit"
          fullWidth
          color="secondary"
          sx={{flex: 10}}
          size="large"
          variant="contained"
        >
          投票
        </LoadingButton>
      </DialogActions>
    </FormProvider>
  );
}

export default MtFeatureEditModalInner;
