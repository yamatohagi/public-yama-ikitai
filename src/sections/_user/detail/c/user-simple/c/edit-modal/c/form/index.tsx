import Typography from '@mui/material/Typography';
import FormProvider from 'src/components/hook-form/FormProvider';
import {RHFTextArea} from 'src/components/hook-form';
import RHFTextField from 'src/components/hook-form/RHFTextField';
import LoadingButton from '@mui/lab/LoadingButton';
import {css} from 'styled-system/css';
import {useEffect} from 'react';
import useUserEditForm from '../../hooks';
import {ImageHandle} from './c/ImageHandle';

type UserEditFormProps = {
  handleReplySubmit: any;
  methods: ReturnType<typeof useUserEditForm>;
  nextActionComponent?: React.ReactNode;
};

export default function UserEditForm({handleReplySubmit, methods, nextActionComponent}: UserEditFormProps) {
  const {
    handleSubmit,
    formState: {isSubmitting, errors: formErrors},
  } = methods;

  // userNameだけは、既に使われているかどうかをリアルタイムでチェックする
  useEffect(() => {
    methods.trigger('userName');
  }, [methods.watch('userName')]);

  return (
    <div className={css({px: 5, color: '#323232'})}>
      <FormProvider methods={methods} onSubmit={handleSubmit(handleReplySubmit)}>
        <Typography fontSize="16px" fontWeight="bold" sx={{mt: '1.5rem', mb: '1rem'}}>
          プロフィールを編集
        </Typography>

        {/* <ImageSelectWithLabel labelMode={false} limit={1} /> */}
        <ImageHandle />

        <RHFTextField size="small" name="name" label="名前" sx={{mt: '3rem', mb: '0.3rem'}} />
        <RHFTextField size="small" name="userName" label="ユーザネーム" sx={{mt: '3rem', mb: '0.3rem'}} />
        <RHFTextArea name="userProfileText" label="自己紹介" sx={{mt: '1rem'}} />
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
        {/*
        {Object.keys(formErrors).map((key) => (
          <Typography key={key} variant="body2" color="error">
            {formErrors[key as keyof typeof formErrors]?.message}
          </Typography>
        ))} */}
        {nextActionComponent}
      </FormProvider>
    </div>
  );
}
