import {Grid, Skeleton, Typography} from '@mui/material';
import useResponsive from 'src/hooks/useResponsive';
import ReloadButton from 'src/components/ui/ReloadButton';
import {paths} from 'src/routes/paths';
import {css} from 'styled-system/css';
import {RHFMultiSelect} from 'src/components/hook-form/RHFMultipleSelect';

import useMtFacilityForm from 'src/sections/_trailhead/create/hooks/useTrailheadForm';
import {GetList} from './api';
import RelationJumpButton from '../../../../../../../components/ui/RelationJumpButton';
import DynamicMtToFcyInput from './c/dynamic-m-to-th-info';

type MtFacilityInputProps = {methods: ReturnType<typeof useMtFacilityForm>};

export default function MtFacilityInput({methods}: MtFacilityInputProps) {
  const {list, isLoading, refetch} = GetList();

  const isMdUp = useResponsive('up', 'md');

  if (isLoading && !list) {
    return <MtFacilityInputSkeleton isMdUp={!!isMdUp} />;
  }

  if (!list) {
    return <>エリアが登録されていません</>;
  }

  return (
    <>
      <Grid item xs={12} sm={12}>
        <div className={css({display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 5})}>
          <Typography variant={isMdUp ? 'subtitle1' : 'subtitle2'} color="#212121" align="left" sx={{}}>
            山小屋
          </Typography>
          <div style={{marginRight: 5}}>
            <RelationJumpButton label="山小屋を登録する" link={`${paths.trailhead.create.path}`} />
          </div>
        </div>
        <div style={{margin: '1rem 0.3rem 0 0.3rem', fontSize: '0.8rem'}}>
          登録済みの山小屋と関連付けることができます。
          <div>山小屋が未登録で選択できない場合は、山小屋の登録時に「登山口」で選択してください。後から編集で追加することも可能です。</div>
        </div>

        <div className={css({display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2})}>
          <RHFMultiSelect
            size="small"
            name="mtFacilityIds"
            textFieldProps={{size: 'small', style: {paddingRight: 20}}}
            options={list.map((obj) => ({
              label: obj.name,
              value: obj.id.toString(),
            }))}
          />
          <ReloadButton reload={refetch} style={{width: 45, marginRight: 2}} />
        </div>
      </Grid>
      <DynamicMtToFcyInput methods={methods} />
    </>
  );
}

const MtFacilityInputSkeleton = ({isMdUp}: {isMdUp: boolean}) => (
  <Grid item xs={12} sm={6}>
    <Typography variant={isMdUp ? 'subtitle1' : 'subtitle2'} color="#212121" align="left" sx={{pl: 0.5, mb: 0.5}}>
      山小屋
    </Typography>
    <Skeleton variant="rectangular" width="100%" height={40} />
  </Grid>
);
