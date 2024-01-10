import {Grid, Typography} from '@mui/material';
import FormProvider from 'src/components/hook-form/FormProvider';
import {RHFTextArea} from 'src/components/hook-form';
import RHFTextField from 'src/components/hook-form/RHFTextField';
import {LoadingButton} from '@mui/lab';
import useResponsive from 'src/hooks/useResponsive';
import RequiredTag from 'src/components/ui/RequiredTag';
import {css} from 'styled-system/css';
import RHFNumberField from 'src/components/hook-form/RHFNumberField';
import SearchLocationButton from 'src/components/search-locations/search-button';
import Divider from 'src/components/ui/Divider';
import ImageSelectWithLabel from 'src/components/ui/image-select/with-label';
import RHFThreeValueCheckBoxBool from 'src/components/hook-form/RHFThreeValueCheckBox_Bool';
import AddressInput from '../../../../../components/custom-form/address-input';
import type useMountainForm from '../../hooks/useMountainForm';
import MtAreaInput from './c/area-input';
import TrailheadInput from './c/trailhead-input';
import MtFacilityInput from './c/mt-facility-input';

type MountainCreateEditFormProps = {
  handleReplySubmit: any;
  methods: ReturnType<typeof useMountainForm>;
  nextActionComponent?: React.ReactNode;
};

const dividerCss = css({py: 2});

export default function MountainCreateEditForm({handleReplySubmit, methods, nextActionComponent}: MountainCreateEditFormProps) {
  const {
    handleSubmit,
    watch,
    formState: {isSubmitting, errors: formErrors},
  } = methods;
  const isMdUp = useResponsive('up', 'md');
  const name = watch('name');

  return (
    <div className={css({px: 5, color: '#323232'})}>
      <FormProvider methods={methods} onSubmit={handleSubmit(handleReplySubmit)}>
        <Typography variant="h6" sx={{mt: 2, mb: 1}}>
          山情報を登録
        </Typography>
        <Typography variant="body2" sx={{mb: 2}}>
          山情報の登録の協力をお願いします。 入力項目が多数あるので、可能な範囲で構いません。
          <br /> <br />
          一度登録した後は、山イキタイのユーザーなら誰でも編集することができます。
          <br /> <br />
          既に同じ山が登録されている場合は後から登録したページは削除されますのでご注意ください。
        </Typography>
        <Grid container>
          <Grid item xs={12} sm={12}>
            <Divider className={css({pb: 2})} width="100%" />
          </Grid>
          {/* 画像選択するやつ */}
          <ImageSelectWithLabel labelMode={false} />
          <Grid item xs={12} sm={12}>
            <Divider className={dividerCss} width="100%" />
          </Grid>
          <Grid item xs={12} sm={12}>
            {/* 名称 */}
            <Typography variant={isMdUp ? 'subtitle1' : 'subtitle2'} color="#323232" align="left" sx={{mb: 0.5}}>
              <RequiredTag /> 名称
            </Typography>
            <RHFTextField size="small" name="name" placeholder="例：富士山 " />
          </Grid>
          {/* 名称かな */}
          <Grid item xs={12} sm={12}>
            <Typography variant={isMdUp ? 'subtitle1' : 'subtitle2'} color="#323232" align="left" sx={{mt: 1, mb: 0.5}}>
              <RequiredTag /> 名称（ふりがな）
            </Typography>
            <RHFTextField size="small" name="nameKana" placeholder="例：ふじさん" />
          </Grid>
          {/* 住所検索ボタン */}
          <Grid item xs={12} sm={12}>
            <SearchLocationButton
              searchWord={name}
              setPostalCode={(i) => methods.setValue('postalCode', i || '', {shouldValidate: true})}
              setPrefecture={(i) => methods.setValue('prefecture', i, {shouldValidate: true})}
              setAddress1={(i) => methods.setValue('address1', i, {shouldValidate: true})}
              setAddress2={(i) => methods.setValue('address2', i, {shouldValidate: true})}
              setLat={(i) => methods.setValue('lat', i || 0, {shouldValidate: true})}
              setLng={(i) => {
                methods.setValue('lng', i || 0, {shouldValidate: true});
                methods.trigger('name');
              }}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <Divider className={dividerCss} width="100%" />
          </Grid>
          {/* 住所 */}
          <AddressInput />
          <Grid item xs={12} sm={12}>
            <Divider className={dividerCss} width="100%" />
          </Grid>
          {/* エリア */}
          <MtAreaInput />
          <Grid item xs={12} sm={12}>
            <Divider className={dividerCss} width="100%" />
          </Grid>
          {/* 百名山 */}
          {/* 二百名山 */}
          <Grid item xs={12} sm={12} sx={{mt: 1.5}}>
            <Typography variant={isMdUp ? 'subtitle1' : 'subtitle2'} color="#323232" align="left" sx={{mt: 1, mb: 0.5}}>
              称号
            </Typography>
            {[
              {label: '百名山', name: 'hyakumeizanStatus'},
              {label: '二百名山', name: 'nihyakumeizanStatus'},
            ].map((v, i) => (
              <RHFThreeValueCheckBoxBool name={v.name} label={v.label} key={i} />
            ))}
          </Grid>
          <Grid item xs={12} sm={12}>
            <Divider className={dividerCss} width="100%" />
          </Grid>
          {/* 工程 */}
          <Grid item xs={12} sm={12} sx={{mt: 1.5}}>
            <Typography variant={isMdUp ? 'subtitle1' : 'subtitle2'} color="#323232" align="left" sx={{mt: 1, mb: 0.5}}>
              称号
            </Typography>
            {[
              {label: '日帰り', name: 'stay0n1d'},
              {label: '一泊二日', name: 'stay1n2d'},
              {label: '二泊三日', name: 'stay2n3d'},
              {label: '三泊四日', name: 'stay3n4d'},
            ].map((v, i) => (
              <RHFThreeValueCheckBoxBool name={v.name} label={v.label} key={i} />
            ))}
          </Grid>
          <Grid item xs={12} sm={12}>
            <Divider className={dividerCss} width="100%" />
          </Grid>
          {/* 標高 */}
          <Grid item xs={12} sm={12} sx={{mt: 1.5}}>
            <Typography variant={isMdUp ? 'subtitle1' : 'subtitle2'} color="#323232" align="left" sx={{mb: 0.5}}>
              標高
            </Typography>
            <RHFNumberField size="small" name="elevation" placeholder="例：3000" unit="m" />
          </Grid>
          <Grid item xs={12} sm={12}>
            <Divider className={dividerCss} width="100%" />
          </Grid>
          {/* 一言 */}
          <Grid item xs={12} sm={12} sx={{mt: 1.5}}>
            <Typography variant={isMdUp ? 'subtitle1' : 'subtitle2'} color="#323232" align="left" sx={{mb: 0.5}}>
              一言コメント
            </Typography>
            <RHFTextField size="small" name="appealPoint" placeholder="" />
          </Grid>
          <Grid item xs={12} sm={12}>
            <Divider className={dividerCss} width="100%" />
          </Grid>
          {/* 説明文 */}
          <Grid item xs={12} sm={12} sx={{mt: 1.5}}>
            <Typography variant={isMdUp ? 'subtitle1' : 'subtitle2'} color="#323232" align="left" sx={{mb: 0.5}}>
              説明文
            </Typography>
            <RHFTextArea size="small" name="description" />
          </Grid>
          <Grid item xs={12} sm={12}>
            <Divider className={dividerCss} width="100%" />
          </Grid>

          {/* 登山口 */}
          <TrailheadInput methods={methods} />
          <Grid item xs={12} sm={12}>
            <Divider className={dividerCss} width="100%" />
          </Grid>

          {/* 山小屋 */}
          <MtFacilityInput methods={methods} />
          <Grid item xs={12} sm={12}>
            <Divider className={dividerCss} width="100%" />
          </Grid>
        </Grid>

        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%'}}>
          {!nextActionComponent && (
            <LoadingButton
              className={css({
                background: '#367B9D',
              })}
              loading={isSubmitting}
              type="submit"
              variant="contained"
              color="primary"
              sx={{mt: '1rem', mb: '1rem', width: '100%', fontSize: '1rem'}}
              disabled={Object.keys(formErrors).length > 0}
            >
              登録する
            </LoadingButton>
          )}
        </div>

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
