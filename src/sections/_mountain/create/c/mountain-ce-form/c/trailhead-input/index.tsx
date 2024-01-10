import {Grid, Skeleton, Typography} from '@mui/material';
import useResponsive from 'src/hooks/useResponsive';
import ReloadButton from 'src/components/ui/ReloadButton';
import {paths} from 'src/routes/paths';
import {css} from 'styled-system/css';
import {RHFMultiSelect} from 'src/components/hook-form/RHFMultipleSelect';

import useMountainForm from 'src/sections/_mountain/create/hooks/useMountainForm';
import {GetTrailheadList} from './api';
import RelationJumpButton from '../../../../../../../components/ui/RelationJumpButton';
import DynamicMtToThInfoInput from './c/dynamic-m-to-th-info';

type TrailheadInputProps = {methods: ReturnType<typeof useMountainForm>};

export default function TrailheadInput({methods}: TrailheadInputProps) {
  const {trailheadList, isLoading, refetch} = GetTrailheadList();
  const isMdUp = useResponsive('up', 'md');

  if (isLoading && !trailheadList) {
    return <TrailheadInputSkeleton isMdUp={!!isMdUp} />;
  }

  if (!trailheadList) {
    return <>エリアが登録されていません</>;
  }

  return (
    <>
      <Grid item xs={12} sm={12}>
        <div className={css({display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 5})}>
          <Typography variant={isMdUp ? 'subtitle1' : 'subtitle2'} color="#323232" align="left" sx={{}}>
            登山口
          </Typography>
          <div style={{marginRight: 5}}>
            <RelationJumpButton label="登山口を登録する" link={`${paths.trailhead.create.path}`} />
          </div>
        </div>
        <div style={{margin: '1rem 0.3rem 0 0.3rem', fontSize: '0.8rem'}}>
          登録済みの登山口と関連付けることができます。
          <div>登山口が未登録で選択できない場合は、登山口の登録時に「登れる山」で選択してください。後から編集で追加することも可能です。</div>
        </div>

        <div className={css({display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2})}>
          <RHFMultiSelect
            size="small"
            name="trailheadIds"
            textFieldProps={{size: 'small', style: {paddingRight: 20}}}
            options={trailheadList.map((obj) => ({
              label: obj.name,
              value: obj.id.toString(),
            }))}
          />
          <ReloadButton reload={refetch} style={{width: 45, marginRight: 2}} />
        </div>
      </Grid>
      <DynamicMtToThInfoInput methods={methods} />
    </>
  );
}

const TrailheadInputSkeleton = ({isMdUp}: {isMdUp: boolean}) => (
  <Grid item xs={12} sm={6}>
    <Typography variant={isMdUp ? 'subtitle1' : 'subtitle2'} color="#323232" align="left" sx={{pl: 0.5, mb: 0.5}}>
      登山口
    </Typography>
    <Skeleton variant="rectangular" width="100%" height={40} />
  </Grid>
);
