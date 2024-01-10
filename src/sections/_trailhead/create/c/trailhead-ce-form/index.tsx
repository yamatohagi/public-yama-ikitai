import {Grid, Typography} from '@mui/material';
import FormProvider from 'src/components/hook-form/FormProvider';
import {RHFRadioGroup} from 'src/components/hook-form';
import RHFTextField from 'src/components/hook-form/RHFTextField';
import {LoadingButton} from '@mui/lab';
import useResponsive from 'src/hooks/useResponsive';
import RequiredTag from 'src/components/ui/RequiredTag';
import {css} from 'styled-system/css';
import RHFNumberField from 'src/components/hook-form/RHFNumberField';
import SearchLocationButton from 'src/components/search-locations/search-button';
import RHFDatePicker from 'src/components/hook-form/RHFDate';
import Divider from 'src/components/ui/Divider';
import ImageSelectWithLabel from 'src/components/ui/image-select/with-label';
import AddressInput from '../../../../../components/custom-form/address-input';
import type useTrailheadForm from '../../hooks/useTrailheadForm';
import MtAreaInput from './c/area-input';
import MountainInput from './c/mountain-input';
import AccessDynamicInput from './c/access-dynamic-input';
import ParkingInput from './c/parking-input';
import MtFacilityInput from './c/mt-facility-input';

const dividerCss = css({py: 2});

type TrailheadCreateEditFormProps = {
  handleReplySubmit: any;
  methods: ReturnType<typeof useTrailheadForm>;
  nextActionComponent?: React.ReactNode;
};
export default function TrailheadCreateEditForm({handleReplySubmit, methods, nextActionComponent}: TrailheadCreateEditFormProps) {
  const {
    watch,
    handleSubmit,
    formState: {isSubmitting, errors: formErrors},
  } = methods;
  const isMdUp = useResponsive('up', 'md');

  const name = watch('name');
  const lastConbiniName = watch('lastConbiniName');

  return (
    <>
      {/* 場所一覧のモーダル */}

      <FormProvider methods={methods} onSubmit={handleSubmit(handleReplySubmit)}>
        <div className={css({px: 5})}>
          <Typography variant="h6" sx={{mt: 2}}>
            登山口を登録
          </Typography>
          <Typography variant="body2">
            登山口の登録の協力をお願いします。 入力項目が多数あるので、可能な範囲で構いません。
            <br /> <br />
            一度登録した後は、山イキタイのユーザーなら誰でも編集することができます。
            <br /> <br />
            既に同じ登山口が登録されている場合は後から登録したページは削除されますのでご注意ください。
          </Typography>
          <Grid item xs={12} sm={12}>
            <Divider className={dividerCss} width="100%" />
          </Grid>
        </div>
        {/* アクセス入力するやつ */}
        <AccessDynamicInput methods={methods} />
        <div className={css({px: 5})}>
          <Grid item xs={12} sm={12}>
            <Divider className={dividerCss} width="100%" />
          </Grid>

          {/* 画像選択するやつ */}
          <ImageSelectWithLabel labelMode={false} />
          <Grid item xs={12} sm={12}>
            <Divider className={dividerCss} width="100%" />
          </Grid>
          <Grid container>
            <Grid item xs={12} sm={12}>
              {/* 名称 */}
              <Typography variant={isMdUp ? 'subtitle1' : 'subtitle2'} color="#323232" align="left" sx={{mb: 0.5}}>
                <RequiredTag /> 名称
              </Typography>
              <RHFTextField size="small" name="name" placeholder="新穂高温泉" sx={{}} />
            </Grid>
            {/* 名称かな */}
            {/* <Grid item xs={12} sm={12}>
            <Typography variant={isMdUp ? 'subtitle1' : 'subtitle2'} color="#323232" align="left" sx={{pl: 0.5, mb: 0.5, mt: 3}}>
              <RequiredTag /> 名称（ふりがな）
            </Typography>
            <RHFTextField size="small" name="nameKana" placeholder="しんほだかおんせん" />
          </Grid> */}
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
            <Grid item xs={12} sm={12} sx={{mt: 3}}>
              {/* 紹介文言 */}
              <Typography variant={isMdUp ? 'subtitle1' : 'subtitle2'} color="#323232" align="left" sx={{}}>
                紹介文
              </Typography>
              <RHFTextField size="small" name="intro" placeholder="例： 槍ヶ岳へ最短で登れる登山口です" sx={{}} />
            </Grid>
            <Grid item xs={12} sm={12}>
              <Divider className={dividerCss} width="100%" />
            </Grid>
            {/* 標高 */}
            <Grid item xs={12} sm={12} sx={{mt: 3}}>
              <Typography variant={isMdUp ? 'subtitle1' : 'subtitle2'} color="#323232" align="left" sx={{}}>
                標高
              </Typography>
              <RHFNumberField size="small" name="elevation" placeholder="例：3000" unit="m" />
            </Grid>
            <Grid item xs={12} sm={12}>
              <Divider className={dividerCss} width="100%" />
            </Grid>
            {/* ラストコンビニ */}
            <Grid item xs={12} sm={12} sx={{mt: 3}}>
              <Typography variant={isMdUp ? 'subtitle1' : 'subtitle2'} color="#323232" align="left" sx={{}}>
                ラストコンビニ
              </Typography>
              <RHFTextField size="small" name="lastConbiniName" placeholder="セブン-イレブン 波田赤松店" sx={{}} />
            </Grid>
            {/* 住所検索ボタン */}
            <Grid item xs={12} sm={12}>
              <SearchLocationButton
                searchWord={lastConbiniName}
                setPostalCode={(i) => ({})}
                setPrefecture={(i) => ({})}
                setAddress1={(i) => ({})}
                setAddress2={(i) => ({})}
                setLat={(i) => methods.setValue('lastConbiniLat', i || 0, {shouldValidate: true})}
                setLng={(i) => methods.setValue('lastConbiniLng', i || 0, {shouldValidate: true})}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <Divider className={dividerCss} width="100%" />
            </Grid>
            <Grid item xs={12} sm={12} sx={{mt: 3}}>
              {/* マイカー規制 */}
              <Typography variant={isMdUp ? 'subtitle1' : 'subtitle2'} color="#323232" align="left" sx={{}}>
                マイカー規制
              </Typography>
              <RHFRadioGroup
                row
                boxSx={{}}
                name="myCarReg"
                options={[
                  {label: 'なし', value: '0'},
                  {label: '時と場合による', value: '2'},
                  {label: 'あり', value: '1'},
                ]}
              />
            </Grid>
            <Grid item xs={12} sm={12} sx={{mt: 3}}>
              {/* トイレ有無 */}
              <Typography variant={isMdUp ? 'subtitle1' : 'subtitle2'} color="#323232" align="left" sx={{}}>
                トイレの有無
              </Typography>
              <RHFRadioGroup
                row
                boxSx={{}}
                name="toilet"
                options={[
                  {label: 'なし', value: '0'},

                  {label: 'あり', value: '1'},
                ]}
              />
            </Grid>
            {/* 自販機の有無 */}
            <Grid item xs={12} sm={12} sx={{mt: 3}}>
              <Typography variant={isMdUp ? 'subtitle1' : 'subtitle2'} color="#323232" align="left" sx={{}}>
                自販機の有無
              </Typography>
              <RHFRadioGroup
                row
                boxSx={{}}
                name="vendingMachine"
                options={[
                  {label: 'なし', value: '0'},

                  {label: 'あり', value: '1'},
                ]}
              />
            </Grid>
            {/* 売店のの有無 */}
            <Grid item xs={12} sm={12} sx={{mt: 3}}>
              <Typography variant={isMdUp ? 'subtitle1' : 'subtitle2'} color="#323232" align="left" sx={{}}>
                売店の有無
              </Typography>
              <RHFRadioGroup
                row
                boxSx={{}}
                name="store"
                options={[
                  {label: 'なし', value: '0'},

                  {label: 'あり', value: '1'},
                ]}
              />
            </Grid>
            {/* remark */}
            <Grid item xs={12} sm={12} sx={{mt: 3}}>
              <Typography variant={isMdUp ? 'subtitle1' : 'subtitle2'} color="#323232" align="left" sx={{}}>
                補足
              </Typography>
              <RHFTextField sx={{}} size="small" name="remark" placeholder="なにか" />
            </Grid>
            <Grid item xs={12} sm={12}>
              <Divider className={dividerCss} width="100%" />
            </Grid>
            {/* 通行止め情報 */}
            <Grid item xs={12} sm={12} sx={{mt: 3}}>
              <Typography variant={isMdUp ? 'subtitle1' : 'subtitle2'} color="#323232" align="left" sx={{}}>
                通行止め情報
              </Typography>
              <RHFTextField sx={{}} size="small" name="roadblockInfo" placeholder="冬季閉鎖あり" />
            </Grid>
            {/* 通行止め情報 */}
            <Grid item xs={6} sm={6} sx={{mt: 3}}>
              <Typography variant={isMdUp ? 'subtitle1' : 'subtitle2'} color="#323232" align="left" sx={{}}>
                通行止め開始日時
              </Typography>
              <RHFDatePicker label="" name="roadblockStart" />
            </Grid>
            <Grid item xs={6} sm={6} sx={{mt: 3}}>
              <Typography variant={isMdUp ? 'subtitle1' : 'subtitle2'} color="#323232" align="left" sx={{}}>
                通行止め終了日時
              </Typography>
              <RHFDatePicker label="" name="roadblockEnd" />
            </Grid>
            <Grid item xs={12} sm={12}>
              <Divider className={dividerCss} width="100%" />
            </Grid>
            {/* 登れる山 */}
            <MountainInput methods={methods} />
            <Grid item xs={12} sm={12}>
              <Divider className={dividerCss} width="100%" />
            </Grid>

            {/* 山小屋へのアクセス */}
            <MtFacilityInput methods={methods} />
            <Grid item xs={12} sm={12}>
              <Divider className={dividerCss} width="100%" />
            </Grid>

            {/* 駐車場 */}
            <ParkingInput methods={methods} />
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
        </div>
      </FormProvider>
    </>
  );
}
