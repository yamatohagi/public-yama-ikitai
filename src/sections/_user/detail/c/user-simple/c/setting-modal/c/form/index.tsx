import {Typography} from '@mui/material';
import FormProvider from 'src/components/hook-form/FormProvider';
import RHFTextField from 'src/components/hook-form/RHFTextField';
import {LoadingButton} from '@mui/lab';
import {css} from 'styled-system/css';
import RHFNumberField from 'src/components/hook-form/RHFNumberField';
import SearchLocationButton from 'src/components/search-locations/search-button';
import useUserInfoForm from '../../hooks';

type UserInfoEditFormProps = {
  handleReplySubmit: any;
  methods: ReturnType<typeof useUserInfoForm>;
  nextActionComponent?: React.ReactNode;
};

export default function UserInfoEditForm({handleReplySubmit, methods, nextActionComponent}: UserInfoEditFormProps) {
  const {
    handleSubmit,
    watch,
    formState: {isSubmitting, errors: formErrors},
  } = methods;

  const name = watch('startPointLabel');
  return (
    <div className={css({color: '#323232'})}>
      <FormProvider methods={methods} onSubmit={handleSubmit(handleReplySubmit)}>
        <Typography fontSize="16px" fontWeight="bold" sx={{mt: '1.5rem', mb: '1rem'}}>
          設定変更
        </Typography>
        <div className={css({color: '#323232', fontSize: '14px', ml: '0.5rem'})}>
          出発地点から移動時間などの計算ができます。
          <br />
          最寄り駅や周辺施設などを設定してください。
        </div>
        <RHFTextField size="small" name="startPointLabel" label="出発地点（例：新宿駅）" sx={{mt: '1rem', mb: '0.3rem'}} />
        <SearchLocationButton
          buttonText="出発地点を検索"
          searchWord={name}
          setPostalCode={(i) => {}}
          setPrefecture={(i) => {}}
          setAddress1={(i) => {}}
          setAddress2={(i) => {}}
          setLat={(i) => methods.setValue('startPointLat', i?.toString() || null, {shouldValidate: true})}
          setLng={(i) => methods.setValue('startPointLng', i?.toString() || null, {shouldValidate: true})}
        />
        <RHFNumberField size="small" name="startPointLat" label="緯度" sx={{mt: '3rem', mb: '0.3rem'}} />
        <RHFNumberField size="small" name="startPointLng" label="軽度" sx={{mt: '3rem', mb: '0.3rem'}} />
        この下の設定は、出発地点からの移動時間を計算するための設定です。
        <RHFNumberField size="small" name="dayMoveMaxTime" label="1日の行動時間" sx={{mt: '3rem', mb: '0.3rem'}} />
        <RHFTextField size="small" name="stayStartTime" label="1日の行動開始時間" sx={{mt: '3rem', mb: '0.3rem'}} />
        <RHFNumberField size="small" name="startDayOfWeek" label="曜日" sx={{mt: '3rem', mb: '0.3rem'}} />
        <RHFNumberField size="small" name="coordinatesRadius" label="関連を出すときの近さ" sx={{mt: '3rem', mb: '0.3rem'}} />
        {!nextActionComponent && (
          <LoadingButton
            className={css({
              background: '#367B9D',
            })}
            loading={isSubmitting}
            type="submit"
            variant="contained"
            color="primary"
            sx={{mt: 3}}
            disabled={Object.keys(formErrors).length > 0}
          >
            登録
          </LoadingButton>
        )}
        {Object.keys(formErrors).map((key) => (
          <Typography key={key} variant="body2" color="error">
            {formErrors[key as keyof typeof formErrors]?.message}
          </Typography>
        ))}
        {nextActionComponent}
      </FormProvider>
    </div>
  );
}
