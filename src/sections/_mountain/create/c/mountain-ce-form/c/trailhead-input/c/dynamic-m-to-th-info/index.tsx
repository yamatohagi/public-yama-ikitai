import {Grid, IconButton, Typography} from '@mui/material';
import {useEffect} from 'react';
import {useFieldArray} from 'react-hook-form';
import {RHFSelectBox} from 'src/components/hook-form';

import {generateDistanceOptions, generateTimeOptions} from 'src/utils/options';
import Iconify from 'src/components/iconify';
import useMountainForm from 'src/sections/_mountain/create/hooks/useMountainForm';
import {GetTrailheadList} from './api';

type DynamicMtToThInfoInputProps = {methods: ReturnType<typeof useMountainForm>};

export default function DynamicMtToThInfoInput({methods}: DynamicMtToThInfoInputProps) {
  const {trailheadList} = GetTrailheadList();
  const {control, watch} = methods;
  const mtIds = watch('trailheadIds');
  const {fields, append, remove} = useFieldArray({
    name: 'MtToThInfos',
    control,
  });

  useEffect(() => {
    if (!mtIds) return;

    // まず要素になくて既存にあるものを削除
    fields.forEach((field, index) => {
      if (!mtIds.includes(field.trailheadId)) remove(index);
    });
    mtIds.forEach((value: string) => {
      // 既に存在しないmtIdのみ追加
      if (!fields.some((field) => field.trailheadId === value)) {
        append({
          trailheadId: value,
          uphillTime: '',
          uphillDistance: '',
          downhillTime: '',
          downhillDistance: '',
        });
      }
    });
  }, [mtIds]);

  /* handle */
  const handleRemove = (index: number) => {
    if (!mtIds) return;
    const newIds = mtIds.filter((_, i) => i !== index);
    methods.setValue('trailheadIds', newIds);
  };

  return (
    <>
      {fields.map((field, index) => (
        <Grid item xs={12} sm={12} key={field.id}>
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem'}}>
            {trailheadList && (
              <Typography variant="h6">{trailheadList.find((th) => th.id === Number(field.trailheadId))?.name} からのルート</Typography>
            )}
            <IconButton onClick={() => handleRemove(index)}>
              <Iconify icon="mdi:remove-bold" sx={{width: 30, height: 30}} />
            </IconButton>
          </div>

          <RHFSelectBox size="small" name={`MtToThInfos.${index}.uphillTime`} label="山頂までの所要時間（上り）" options={generateTimeOptions()} />
          <div style={{marginTop: '1rem'}}>
            <RHFSelectBox
              size="small"
              name={`MtToThInfos.${index}.downhillTime`}
              label="山頂からの所要時間（下り）"
              options={generateTimeOptions()}
            />
          </div>
          <div style={{marginTop: '1rem', marginBottom: '1rem'}}>
            <RHFSelectBox size="small" name={`MtToThInfos.${index}.uphillDistance`} label="山頂までの距離" options={generateDistanceOptions()} />
          </div>
          {/* <RHFSelectBox
            size="small"
            name={`MtToThInfos.${index}.downhillDistance`}
            label="下山にかかる距離（例：10km）"
            options={generateDistanceOptions()}
          /> */}
        </Grid>
      ))}
    </>
  );
}
