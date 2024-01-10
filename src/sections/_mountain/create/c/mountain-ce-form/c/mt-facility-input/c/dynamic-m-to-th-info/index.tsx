import {Grid, IconButton, Typography} from '@mui/material';
import {useEffect} from 'react';
import {useFieldArray} from 'react-hook-form';
import {RHFSelectBox} from 'src/components/hook-form';

import {generateDistanceOptions, generateTimeOptions} from 'src/utils/options';
import Iconify from 'src/components/iconify';
import useMtFacilityForm from 'src/sections/_mountain/create/hooks/useMountainForm';
import {defaultInstance} from 'src/service/zodHelper';
import {MountainToMtFacilityCreateWithoutMtFacilityInputSchema} from 'server/routers/mountain/schemas/objects/MountainCreateInput.schema';
import {GetList} from './api';

type DynamicMtToFcyInputProps = {methods: ReturnType<typeof useMtFacilityForm>};

export default function DynamicMtToFcyInput({methods}: DynamicMtToFcyInputProps) {
  const scheme = MountainToMtFacilityCreateWithoutMtFacilityInputSchema;
  const {list} = GetList();
  const {control, watch} = methods;
  const mtIds = watch('mtFacilityIds');
  const {fields, append, remove} = useFieldArray({
    name: 'MountainToMtFacility',
    control,
  });

  useEffect(() => {
    if (!mtIds) return;

    // まず要素になくて既存にあるものを削除
    fields.forEach((field, index) => {
      if (!mtIds.includes(field.mtFacilityId)) remove(index);
    });
    mtIds.forEach((value: string) => {
      // 既に存在しないmtIdのみ追加
      if (!fields.some((field) => field.mtFacilityId === value)) {
        append({
          ...defaultInstance<typeof scheme>(scheme),
          mtFacilityId: value,
        });
      }
    });
  }, [mtIds]);

  /* handle */
  const handleRemove = (index: number) => {
    if (!mtIds) return;
    const newIds = mtIds.filter((_, i) => i !== index);
    methods.setValue('mtFacilityIds', newIds);
  };

  return (
    <>
      {fields.map((field, index) => (
        <Grid item xs={12} sm={12} key={field.id}>
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem'}}>
            {list && <Typography variant="h6">{list.find((th) => th.id === Number(field.mtFacilityId))?.name}からのルート</Typography>}
            <IconButton onClick={() => handleRemove(index)}>
              <Iconify icon="mdi:remove-bold" sx={{width: 30, height: 30}} />
            </IconButton>
          </div>

          <RHFSelectBox
            size="small"
            name={`MountainToMtFacility.${index}.timeFrom`}
            label="山頂までの所要時間（上り）"
            options={generateTimeOptions()}
          />
          <div style={{marginTop: '1rem'}}>
            <RHFSelectBox
              size="small"
              name={`MountainToMtFacility.${index}.timeTo`}
              label="山頂からの所要時間（下り）"
              options={generateTimeOptions()}
            />
          </div>
          <div style={{marginTop: '1rem', marginBottom: '1rem'}}>
            <RHFSelectBox
              size="small"
              name={`MountainToMtFacility.${index}.distanceFrom`}
              label="山頂までの距離"
              options={generateDistanceOptions()}
            />
          </div>
          {/* <RHFSelectBox
            size="small"
            name={`MountainToMtFacility.${index}.distanceTo`}
            label="山頂から山小屋まで（例：10km）"
            options={generateDistanceOptions()}
          /> */}
        </Grid>
      ))}
    </>
  );
}
