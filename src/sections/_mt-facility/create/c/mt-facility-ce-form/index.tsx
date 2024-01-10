import {Grid, Typography} from '@mui/material';
import FormProvider from 'src/components/hook-form/FormProvider';
import {RHFRadioGroup, RHFSelectBox, RHFTextArea} from 'src/components/hook-form';
import RHFTextField from 'src/components/hook-form/RHFTextField';
import {LoadingButton} from '@mui/lab';
import useResponsive from 'src/hooks/useResponsive';
import RequiredTag from 'src/components/ui/RequiredTag';
import {css} from 'styled-system/css';
import RHFNumberField from 'src/components/hook-form/RHFNumberField';
import SearchLocationButton from 'src/components/search-locations/search-button';
import Divider from 'src/components/ui/Divider';
import RHFThreeValueCheckBox from 'src/components/hook-form/RHFThreeValueCheckBox';
import ImageSelectWithLabel from 'src/components/ui/image-select/with-label';
import AddressInput from '../../../../../components/custom-form/address-input';
import type useMtFacilityForm from '../../hooks/useMtFacilityForm';
import MtAreaInput from './c/area-input';
import AccessInputForTrailhead from './c/access-input-for-th';

import RsvMethodInput from './c/rsv-method-input';
import TypeInput from './c/type-input';
import PayMethodInput from './c/pay-method-input';
import BusinessPeriodInput from './c/business-period-input';
import AccessInputForMt from './c/access-input-for-mt';

type MtFacilityCreateEditFormProps = {
  handleReplySubmit: any;
  methods: ReturnType<typeof useMtFacilityForm>;
  nextActionComponent?: React.ReactNode;
};

const dividerCss = css({py: 2});

export default function MtFacilityCreateEditForm({handleReplySubmit, methods, nextActionComponent}: MtFacilityCreateEditFormProps) {
  const {
    handleSubmit,
    watch,
    formState: {isSubmitting, errors: formErrors},
  } = methods;
  const isMdUp = useResponsive('up', 'md');
  const name = watch('name');
  console.log(formErrors);

  return (
    <div className={css({px: 5})}>
      <FormProvider methods={methods} onSubmit={handleSubmit(handleReplySubmit)}>
        <Typography variant="h6" sx={{mt: 2, mb: 1}}>
          小屋の情報を登録
        </Typography>
        <Typography variant="body2" sx={{mb: 2}}>
          小屋情報の登録の協力をお願いします。 入力項目が多数あるので、可能な範囲で構いません。
          <br /> <br />
          一度登録した後は、山イキタイのユーザーなら誰でも編集することができます。
          <br /> <br />
          既に同じ小屋が登録されている場合は後から登録したページは削除されますのでご注意ください。
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
          {/* 名称 */}
          <Grid item xs={12} sm={12}>
            <Typography variant={isMdUp ? 'subtitle1' : 'subtitle2'} color="#323232" align="left" sx={{mb: 0.5}}>
              <RequiredTag /> 名称
            </Typography>
            <RHFTextField size="small" name="name" placeholder="例：双六小屋 " />
          </Grid>
          {/* 名称かな */}
          <Grid item xs={12} sm={12}>
            <Typography variant={isMdUp ? 'subtitle1' : 'subtitle2'} color="#323232" align="left" sx={{mt: 1, mb: 0.5}}>
              名称（ふりがな）
            </Typography>
            <RHFTextField size="small" name="nameKana" placeholder="例：すごろくごや" />
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
              setName={(i) => methods.setValue('name', i || '', {shouldValidate: true})}
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
          {/* タイプ  // テント場、山小屋、ホテルなど */}
          <TypeInput dividerCss={dividerCss} />

          {/* 電波有無docomo */}
          <Grid item xs={12} sm={12} sx={{mt: 1.5}}>
            <Typography variant={isMdUp ? 'subtitle1' : 'subtitle2'} color="#323232" align="left" sx={{mb: 1}}>
              電波
            </Typography>
            <RHFRadioGroup
              label="docomo"
              row
              name="docomo"
              options={[
                {label: '未設定', value: ''},
                {label: 'あり', value: '1'},
                {label: 'なし', value: '0'},
              ]}
            />
            <RHFRadioGroup
              label="au"
              row
              name="au"
              options={[
                {label: '未設定', value: ''},
                {label: 'あり', value: '1'},
                {label: 'なし', value: '0'},
              ]}
            />
            <RHFRadioGroup
              label="softbank"
              row
              name="softbank"
              options={[
                {label: '未設定', value: ''},
                {label: 'あり', value: '1'},
                {label: 'なし', value: '0'},
              ]}
            />
            <RHFRadioGroup
              label="rakuten"
              row
              name="rakuten"
              options={[
                {label: '未設定', value: ''},
                {label: 'あり', value: '1'},
                {label: 'なし', value: '0'},
              ]}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <Divider className={dividerCss} width="100%" />
          </Grid>
          {/* 登山口からのアクセス */}
          <AccessInputForTrailhead methods={methods} />

          {/* 山からのアクセス */}
          <AccessInputForMt methods={methods} />
          <Grid item xs={12} sm={12}>
            <Divider className={dividerCss} width="100%" />
          </Grid>
          {/* 標高 */}
          <Grid item xs={12} sm={12} sx={{mt: 1.5}}>
            <Typography variant={isMdUp ? 'subtitle1' : 'subtitle2'} color="#323232" sx={{mb: 0.5}}>
              標高
            </Typography>
            <RHFNumberField size="small" name="listElevation" placeholder="例：3000" unit="m" />
          </Grid>
          <Grid item xs={12} sm={12}>
            <Divider className={dividerCss} width="100%" />
          </Grid>

          {/* 収容人数 */}
          <Grid item xs={12} sm={12} sx={{mt: 1.5}}>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
              <Typography variant={isMdUp ? 'subtitle1' : 'subtitle2'} color="#323232" sx={{}}>
                収容人数
              </Typography>
            </div>
          </Grid>
          <Grid item xs={6} sm={6} sx={{mt: 1.5}}>
            <Typography variant={isMdUp ? 'subtitle1' : 'subtitle2'} color="#323232" sx={{mb: 0.5}}>
              テント
            </Typography>
            <RHFSelectBox
              style={{marginRight: '10px', width: '150px'}}
              size="small"
              name="listCapacityTent"
              options={Array.from({length: 31}, (_, i) => ({label: `${i * 10} 張り`, value: i * 10}))}
            />
          </Grid>
          {/* 収容人数 */}
          <Grid item xs={6} sm={6} sx={{mt: 1.5}}>
            <Typography variant={isMdUp ? 'subtitle1' : 'subtitle2'} color="#323232" sx={{mb: 0.5}}>
              小屋
            </Typography>
            <RHFSelectBox
              style={{marginRight: '10px', width: '150px'}}
              size="small"
              name="listCapacityHut"
              options={Array.from({length: 31}, (_, i) => ({label: `${i * 10} 人`, value: i * 10}))}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <Divider className={dividerCss} width="100%" />
          </Grid>
          {/* 料金(テント) */}
          <Grid item xs={12} sm={12} sx={{mt: 1.5}}>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
              <Typography variant={isMdUp ? 'subtitle1' : 'subtitle2'} color="#323232" sx={{}}>
                料金
              </Typography>
            </div>
          </Grid>

          <Grid container spacing={0} sx={{mt: 0}}>
            <Grid item xs={6} sm={6} sx={{mt: 1.5}}>
              <Typography variant={isMdUp ? 'subtitle1' : 'subtitle2'} color="#323232" sx={{mb: 0.5}}>
                テント
              </Typography>
              <RHFSelectBox
                style={{marginRight: '10px', width: '150px'}}
                size="small"
                name="listFeeTent"
                options={Array.from({length: (5000 - 1000) / 500 + 1}, (_, i) => ({label: `${1000 + i * 500}円`, value: 1000 + i * 500}))}
              />
            </Grid>
          </Grid>
          <Grid container spacing={0} sx={{mt: 0}}>
            {/* 素泊まり(山小屋) */}
            <Grid item xs={6} sm={6} sx={{mt: 1.5}}>
              <Typography variant={isMdUp ? 'subtitle1' : 'subtitle2'} color="#323232" sx={{mb: 0.5}}>
                小屋(素泊まり)
              </Typography>
              <RHFSelectBox
                style={{marginRight: '10px', width: '150px'}}
                size="small"
                name="listFeeHut2"
                options={Array.from({length: (20000 - 7000) / 500 + 1}, (_, i) => ({label: `${7000 + i * 500}円`, value: 7000 + i * 500}))}
              />
            </Grid>
            {/* 山小屋1泊2日 */}
            <Grid item xs={6} sm={6} sx={{mt: 1.5}}>
              <Typography variant={isMdUp ? 'subtitle1' : 'subtitle2'} color="#323232" sx={{mb: 0.5}}>
                小屋(1泊2日)
              </Typography>
              <RHFSelectBox
                style={{marginRight: '10px', width: '150px'}}
                size="small"
                name="listFeeHut"
                options={Array.from({length: (20000 - 7000) / 500 + 1}, (_, i) => ({label: `${7000 + i * 500}円`, value: 7000 + i * 500}))}
              />
            </Grid>
          </Grid>
          <Grid item xs={12} sm={12}>
            <Divider className={dividerCss} width="100%" />
          </Grid>
          {/* 電話番号 */}
          <Grid item xs={12} sm={12} sx={{mt: 1.5}}>
            <Typography variant={isMdUp ? 'subtitle1' : 'subtitle2'} color="#323232" align="left" sx={{mb: 0.5}}>
              電話番号① (事務所)
            </Typography>
            <RHFTextField size="small" name="listTelOffice" placeholder="例：03-1234-5678" />
          </Grid>
          {/* 電話番号 */}
          <Grid item xs={12} sm={12} sx={{mt: 1.5}}>
            <Typography variant={isMdUp ? 'subtitle1' : 'subtitle2'} color="#323232" sx={{mb: 0.5}}>
              電話番号② (現地電話)
            </Typography>
            <RHFTextField size="small" name="listTelLocal" placeholder="例：080-1234-5678" />
          </Grid>
          <Grid item xs={12} sm={12}>
            <Divider className={dividerCss} width="100%" />
          </Grid>
          {/* 電話番号 */}
          <Grid item xs={12} sm={12} sx={{mt: 1.5}}>
            <Typography variant={isMdUp ? 'subtitle1' : 'subtitle2'} color="#323232" sx={{mb: 0.5}}>
              HP
            </Typography>
            <RHFTextField size="small" name="listHp" placeholder="URLを貼り付け" />
          </Grid>
          <Grid item xs={12} sm={12}>
            <Divider className={dividerCss} width="100%" />
          </Grid>
          {/* 営業期間 */}
          <BusinessPeriodInput methods={methods} />
          {/* 予約方法 */}
          {/* 選択肢の順番「予約不要」を先頭か最後尾に変えたい */}
          <RsvMethodInput dividerCss={dividerCss} />

          {/* 決済 */}
          <PayMethodInput dividerCss={dividerCss} />

          {/* 設備 */}
          <Grid item xs={12} sm={12} sx={{mt: 1.5}}>
            <Typography variant={isMdUp ? 'subtitle1' : 'subtitle2'} color="#323232" sx={{mb: 1}}>
              設備 (複数可)
            </Typography>
            {[
              {label: '宿泊施設', name: 'tStay'},
              {label: 'カフェスペース', name: 'tCafeSpace'},
              {label: 'テント場', name: 'tTent'},
              {label: '売店', name: 'tShop'},
              {label: 'トイレ', name: 'tToilet'},
              {label: '洗面台', name: 'tBathSink'},
              {label: '更衣室', name: 'tChangingRoom'},
              {label: '乾燥室', name: 'tDryRoom'},
              {label: 'お風呂', name: 'tBath'},
              {label: '電波', name: 'tWave'},
              {label: 'Wifi', name: 'tWifi'},
              {label: '公衆電話', name: 'tPublicPhone'},
              {label: '自炊場', name: 'tKitchen'},
              {label: '談話室', name: 'tTalkRoom'},
              {label: 'その他', name: 'tOther'},
            ].map((v, i) => (
              <RHFThreeValueCheckBox name={v.name} label={v.label} key={i} />
            ))}
          </Grid>
          <Grid item xs={12} sm={12}>
            <Divider className={dividerCss} width="100%" />
          </Grid>
          {/* 名称 */}
          <Grid item xs={12} sm={12}>
            <Typography variant={isMdUp ? 'subtitle1' : 'subtitle2'} color="#323232" sx={{mb: 0.5}}>
              備考
            </Typography>
            <RHFTextArea name="remark" placeholder="水が美味しい" />
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
