import {LoadingButton} from '@mui/lab';
import {DialogActions, Button, Grid, Typography, Skeleton} from '@mui/material';
import {MtFacility} from '@prisma/client';
import FormProvider from 'src/components/hook-form/FormProvider';
import useResponsive from 'src/hooks/useResponsive';
import {RHFRadioGroup, RHFTextArea} from 'src/components/hook-form';
import {useModalState} from 'src/components/provider/useModalStateJotai';
import {css} from 'styled-system/css';
import {useSession} from 'next-auth/react';
import {useRouter} from 'next/router';
import {paths} from 'src/routes/paths';
import useMtFacilityForm, {MtFacilityInput} from './hooks';
import {UpdateFacilitySpecific} from './api';
import {FacilitySpecificItemEditModalAtom} from './atom';

export type FacilitySpecificEditModalProps = {
  mtFacilityId: number;
  idName: string;
  editProps: {
    flagColumName: keyof MtFacility;
    remarkColumName: keyof MtFacility;
  };
  refresh: VoidFunction;
  title: string;
};

// modalのメインのコンポーネントの中に入れるとチラつくから出してる
function FacilitySpecificEditModalInner({refresh, title, mtFacilityId, idName, editProps}: FacilitySpecificEditModalProps) {
  const isMdUp = useResponsive('up', 'md');
  const {closeModal} = useModalState(FacilitySpecificItemEditModalAtom);
  const methods = useMtFacilityForm();
  const {data: session} = useSession();
  const userId = session?.user?.id;
  const router = useRouter();

  const {
    handleSubmit,
    formState: {isSubmitting, isLoading},
  } = methods;

  const {update} = UpdateFacilitySpecific({refresh, closeModal});

  const onSubmit = async (formValue: MtFacilityInput) => {
    try {
      if (!mtFacilityId || !idName || !editProps) return;

      if (!userId) {
        router.push(paths.login.path);
        return;
      }

      await update.mutateAsync({
        mtFacilityId: Number(mtFacilityId),
        flag: {
          columnName: editProps.flagColumName,
          value: formValue.flag,
        },
        remark: {
          columnName: editProps.remarkColumName,
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
            「{idName}」の情報編集
          </Typography>
        </Grid>

        <Grid item xs={12} sm={12} sx={{mt: 1.5}}>
          {isLoading ? (
            <Skeleton width="60%" height="3.0rem" />
          ) : (
            <RHFRadioGroup
              row
              name="flag"
              options={[
                {label: 'あり', value: '1'},
                {label: 'なし', value: '0'},
                {label: '未設定', value: ''},
              ]}
            />
          )}
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} sx={{mt: 1.5}}>
            <Typography variant={isMdUp ? 'subtitle1' : 'subtitle2'} color="#323232" align="left" sx={{mb: 0.5}}>
              説明文
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

export default FacilitySpecificEditModalInner;
