import {Grid, IconButton, SxProps, Typography} from '@mui/material';
import {useFieldArray} from 'react-hook-form';
import {ParkingSchema} from 'server/routers/trailhead/objects/TrailheadCreateInput.schema';
import {RHFRadioGroup, RHFSelectBox} from 'src/components/hook-form';
import RHFTextField from 'src/components/hook-form/RHFTextField';
import RHFNumberField from 'src/components/hook-form/RHFNumberField';
import Iconify from 'src/components/iconify';
import useTrailheadForm from 'src/sections/_trailhead/create/hooks/useTrailheadForm';
import {defaultInstance} from 'src/service/zodHelper';
import {generateDistanceOptions, generateTimeOptions} from 'src/utils/options';
import SearchLocationButton from 'src/components/search-locations/search-button';

type ParkingInputProps = {methods: ReturnType<typeof useTrailheadForm>};

export default function ParkingInput({methods}: ParkingInputProps) {
  const {fields, append, remove} = useParkingFieldArray(methods);
  return (
    <>
      <Grid item xs={12} sm={12}>
        <Typography variant="subtitle2" color="#323232" align="left" sx={{mt: 5}}>
          駐車場
        </Typography>
      </Grid>
      {fields.map((field, index) => (
        <ParkingItem key={field.id} index={index} field={field} methods={methods} remove={remove} />
      ))}

      <Grid item xs={12} sm={12}>
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          <IconButton onClick={() => append(defaultInstance(ParkingSchema))} style={{color: '#367B9D', marginTop: '1rem'}}>
            <Iconify icon="ic:baseline-plus" sx={{width: 30, height: 30}} />
            <Typography variant="h6"> 駐車場を追加</Typography>
          </IconButton>
        </div>
      </Grid>
    </>
  );
}

function ParkingItem({
  index,
  field,
  methods,
  remove,
}: {
  index: number;
  field: ReturnType<typeof useParkingFieldArray>['fields'][number];
  methods: ReturnType<typeof useTrailheadForm>;
  remove: ReturnType<typeof useParkingFieldArray>['remove'];
}) {
  const {watch} = methods;
  console.log(watch());
  const rhfFieldSx: SxProps = {px: 1, mt: 3};
  const name = watch('Parking')?.[index].name || '';

  return (
    <Grid item xs={12} sm={12} key={field.id} sx={{mt: index !== 0 ? 3 : 0}}>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <Typography variant="body2" color="#808080" sx={{ml: 1, fontWeight: 'bold'}}>
          {watch('Parking')?.[index].name || `駐車場${index + 1}`}
        </Typography>
        <IconButton onClick={() => remove(index)}>
          <Iconify icon="mdi:remove-bold" sx={{width: 30, height: 30}} />
        </IconButton>
      </div>

      <RHFTextField size="small" name={`Parking.${index}.name`} placeholder="名称（例：さわんど駐車場）" sx={{...rhfFieldSx, mt: 0}} />
      <SearchLocationButton
        setUrl={(i) => methods.setValue(`Parking.${index}.mapLink`, i || '', {shouldValidate: true})}
        setPostalCode={(i) => {}}
        setPrefecture={(i) => {}}
        setAddress1={(i) => {}}
        setAddress2={(i) => {}}
        searchWord={name}
        setLat={(i) => methods.setValue(`Parking.${index}.lat`, i || 0, {shouldValidate: true})}
        setLng={(i) => {
          methods.setValue(`Parking.${index}.lng`, i || 0, {shouldValidate: true});
          methods.trigger(`Parking.${index}.name`);
        }}
      />
      {/* <RHFTextField size="small" name={`Parking.${index}.nameKana`} placeholder="名称かな（例：さわんどちゅうしゃじょう）" sx={rhfFieldSx} /> */}
      <RHFTextField size="small" name={`Parking.${index}.mapLink`} placeholder="マップURL（https://google.map.exmple）" sx={rhfFieldSx} />
      <RHFNumberField size="small" name={`Parking.${index}.capacity`} placeholder="駐車場のキャパ （例：50台）" sx={rhfFieldSx} />

      <RHFRadioGroup
        boxSx={rhfFieldSx}
        radioGroupSx={{ml: 1}}
        row
        name={`Parking.${index}.methodToTh`}
        label="登山口までの手段"
        options={[
          {label: '徒歩', value: 'walk'},
          {label: '電車・バス等', value: 'publicTransport'},
        ]}
        sx={rhfFieldSx}
      />

      <RHFSelectBox
        sx={rhfFieldSx}
        size="small"
        name={`Parking.${index}.timeToTrailhead`}
        label="登山口までの時間（例：1時間）"
        options={generateTimeOptions(1, 3)}
      />
      {watch(`Parking.${index}.methodToTh`) === `walk` && (
        <RHFSelectBox
          sx={rhfFieldSx}
          size="small"
          name={`Parking.${index}.distanceToTrailhead`}
          label="登山口までの距離（例；1km）"
          options={generateDistanceOptions(0.1, 3)}
        />
      )}
      {/* こういう感じで出し訳して極力input減らす */}
      {watch(`Parking.${index}.methodToTh`) !== `walk` && (
        <RHFNumberField size="small" name={`Parking.${index}.feeToTrailhead`} label="登山口までの料金 （例：1200）" sx={rhfFieldSx} />
      )}

      <RHFRadioGroup
        boxSx={rhfFieldSx}
        radioGroupSx={{ml: 1}}
        row
        name={`Parking.${index}.feeFree`}
        label="無料駐車場"
        options={[
          {label: 'はい', value: true},
          {label: 'いいえ', value: false},
        ]}
      />
      <RHFRadioGroup
        radioGroupSx={{ml: 1}}
        boxSx={rhfFieldSx}
        row
        name={`Parking.${index}.dirtRoad`}
        label="ダート道の有無"
        options={[
          {label: 'あり', value: true},
          {label: 'なし', value: false},
        ]}
      />

      <RHFTextField size="small" name={`Parking.${index}.feeStr`} placeholder="駐車料金 (例: 1200円/回)" sx={rhfFieldSx} />
      <RHFTextField size="small" name={`Parking.${index}.notes`} placeholder="補足等（例：一個下に行くと無料）" sx={rhfFieldSx} />
    </Grid>
  );
}

// useFieldArrayのhooksを作る
const useParkingFieldArray = (methods: ReturnType<typeof useTrailheadForm>) => {
  const {control} = methods;
  const {fields, append, remove} = useFieldArray({name: 'Parking', control});
  return {fields, append, remove};
};
