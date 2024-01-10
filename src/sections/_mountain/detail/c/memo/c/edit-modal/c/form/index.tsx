import {Grid, IconButton, Typography} from '@mui/material';
import FormProvider from 'src/components/hook-form/FormProvider';
import {RHFTextArea} from 'src/components/hook-form';
import RHFTextField from 'src/components/hook-form/RHFTextField';
import {LoadingButton} from '@mui/lab';
import {css} from 'styled-system/css';
import Divider from 'src/components/ui/Divider';
import {useFieldArray} from 'react-hook-form';
import {defaultInstance} from 'src/service/zodHelper';
import Iconify from 'src/components/iconify';
import {MtUrlMemo} from 'server/routers/mt-url-memo/schemas/objects/MountainCreateInput.schema';
import useMtMemoForm from '../../hooks';

type MtMemoFormProps = {
  handleReplySubmit: any;
  methods: ReturnType<typeof useMtMemoForm>;
  nextActionComponent?: React.ReactNode;
};

const dividerCss = css({py: 2, mb: 2});

export default function MtMemoForm({handleReplySubmit, methods, nextActionComponent}: MtMemoFormProps) {
  const {
    handleSubmit,
    control,
    formState: {isSubmitting, errors: formErrors},
  } = methods;

  const {fields, append, remove} = useFieldArray({
    name: 'MtUrlMemo',
    control,
  });

  return (
    <div className={css({px: 5, color: '#323232'})}>
      <FormProvider methods={methods} onSubmit={handleSubmit(handleReplySubmit)}>
        <Typography variant="h6" sx={{mt: 2, mb: 1}}>
          URLメ
        </Typography>

        {fields.map((field, index) => (
          <Grid item xs={12} sm={12} key={field.id}>
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
              <IconButton onClick={() => remove(index)} style={{color: '#367B9D', marginTop: '1rem'}}>
                <Iconify icon="ic:baseline-plus" sx={{width: 30, height: 30}} />
                <Typography variant="h6"> 削除</Typography>
              </IconButton>
            </div>
            <RHFTextField size="small" name={`MtUrlMemo.${index}.name`} label="タイトル" />
            <RHFTextField size="small" name={`MtUrlMemo.${index}.url`} label="url" />
            <RHFTextArea size="small" name={`MtUrlMemo.${index}.remark`} label="メモ" />

            <Divider className={dividerCss} width="100%" />
          </Grid>
        ))}

        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          <IconButton onClick={() => append(defaultInstance(MtUrlMemo))} style={{color: '#367B9D', marginTop: '1rem'}}>
            <Iconify icon="ic:baseline-plus" sx={{width: 30, height: 30}} />
            <Typography variant="h6"> 追加</Typography>
          </IconButton>
        </div>

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
