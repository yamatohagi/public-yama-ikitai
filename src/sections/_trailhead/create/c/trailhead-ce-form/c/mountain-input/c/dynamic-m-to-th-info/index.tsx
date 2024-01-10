import {Grid, IconButton, Typography} from '@mui/material';
import {useEffect} from 'react';
import {useFieldArray} from 'react-hook-form';
import {RHFSelectBox} from 'src/components/hook-form';
import usTrailheadForm from 'src/sections/_trailhead/create/hooks/useTrailheadForm';
import {generateDistanceOptions, generateTimeOptions} from 'src/utils/options';
import Iconify from 'src/components/iconify';
import {GetMtList} from './api';

type DynamicMtToThInfoInputProps = {methods: ReturnType<typeof usTrailheadForm>};

export default function DynamicMtToThInfoInput({methods}: DynamicMtToThInfoInputProps) {
  const {mtList} = GetMtList();
  const {control, watch} = methods;
  const mtIds = watch('mtIds');
  const {fields, append, remove} = useFieldArray({
    name: 'MountainToTrailhead',
    control,
  });

  useEffect(() => {
    if (!mtIds) return;

    // まず要素になくて既存にあるものを削除
    fields.forEach((field, index) => {
      if (!mtIds.includes(field.mountainId)) remove(index);
    });
    mtIds.forEach((value: string) => {
      // 既に存在しないmtIdのみ追加
      if (!fields.some((field) => field.mountainId === value)) {
        append({
          mountainId: value,
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
    methods.setValue('mtIds', newIds);
  };

  return (
    <>
      {fields.map((field, index) => (
        <Grid item xs={12} sm={12} key={field.id}>
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
            {mtList && <Typography variant="h6">{mtList.find((mt) => mt.id === Number(field.mountainId))?.name}へのルート</Typography>}
            <IconButton onClick={() => handleRemove(index)}>
              <Iconify icon="mdi:remove-bold" sx={{width: 30, height: 30}} />
            </IconButton>
          </div>

          <RHFSelectBox
            size="small"
            name={`MountainToTrailhead.${index}.uphillTime`}
            label="山頂までの所要時間（上り）"
            options={generateTimeOptions()}
          />
          <div style={{marginTop: '1rem'}}>
            <RHFSelectBox
              size="small"
              name={`MountainToTrailhead.${index}.downhillTime`}
              label="山頂からの所要時間（下り）"
              options={generateTimeOptions()}
            />
          </div>

          <div style={{marginTop: '1rem', marginBottom: '1rem'}}>
            <RHFSelectBox
              size="small"
              name={`MountainToTrailhead.${index}.uphillDistance`}
              label="山頂までの距離"
              options={generateDistanceOptions()}
            />
          </div>
          {/* <RHFSelectBox
            size="small"
            name={`MountainToTrailhead.${index}.downhillDistance`}
            label="下山にかかる距離（例：10km）"
            options={generateDistanceOptions()}
          /> */}
        </Grid>
      ))}
    </>
  );
}
