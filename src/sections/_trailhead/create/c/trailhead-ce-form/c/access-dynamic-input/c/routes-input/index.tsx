import {Button} from '@mui/material';
import MethodTypeSchema from 'generated/schema/zod/inputTypeSchemas/MethodTypeSchema';
import SegmentTypeSchema from 'generated/schema/zod/inputTypeSchemas/SegmentTypeSchema';

import {Fragment, useEffect} from 'react';
import {useFieldArray} from 'react-hook-form';
import {TrailheadCreateInputObjectSchema} from 'server/routers/trailhead/objects/TrailheadCreateInput.schema';
import Modal from 'src/components/Modal';
import {RHFSelectBox} from 'src/components/hook-form';
import RHFTextField from 'src/components/hook-form/RHFTextField';
import Iconify from 'src/components/iconify';
import {useModalState, createModalAtom} from 'src/components/provider/useModalStateJotai';
import {convertMinutesToTime} from 'src/functions/etc';
import useTrailheadForm from 'src/sections/_trailhead/create/hooks/useTrailheadForm';
import {generateTimeOptions} from 'src/utils/options';
import {css} from 'styled-system/css';

interface RouteInputProps {
  groupName: `TrailheadRouteGroup.${number}`;
  methods: ReturnType<typeof useTrailheadForm>;
  groupIndex: number;
}

export const RoutesInputModalAtom = createModalAtom<{idx: number; groupIndex: number}>();

export function RoutesInput({groupName, methods, groupIndex}: RouteInputProps) {
  const {isOpen, modalProps, closeModal} = useModalState(RoutesInputModalAtom);

  const {control, watch} = methods;
  const {fields, append, remove} = useFieldArray({
    control,
    name: `${groupName}.routes`,
  });
  const order = fields.length;

  return (
    <div className={css({border: '5px solid #71BFD8', borderRadius: '18px', ml: '1.5rem', mr: '1.5rem', padding: '20px'})}>
      <div style={{display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gridTemplateRows: 'repeat(12, 30px)', padding: '10px'}}>
        {fields.map((item, index) => {
          const typeValue = watch().TrailheadRouteGroup?.[groupIndex].routes[index]?.type as SegmentTypeKeys;
          const point = watch().TrailheadRouteGroup?.[groupIndex].routes[index];
          return (
            <Fragment key={item.id}>
              {point && <Route point={point} idx={index} groupIndex={groupIndex} />}

              <Modal open={isOpen && modalProps.idx === index && modalProps.groupIndex === groupIndex} onClose={closeModal}>
                <ARouteInput groupName={groupName} methods={methods} typeValue={typeValue} index={index} />
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginTop: '1rem',
                    marginBottom: '1rem',
                    padding: '0 1rem 0 1rem',
                  }}
                >
                  <Button
                    style={{color: '#FFF', background: '#FA541C'}}
                    onClick={() => {
                      closeModal();
                    }}
                  >
                    OK
                  </Button>

                  <Button
                    style={{color: '#808080', border: '1px solid #808080', background: '#FFF'}}
                    onClick={() => {
                      remove(index);
                      closeModal();
                    }}
                  >
                    ルート削除
                  </Button>
                </div>
              </Modal>
            </Fragment>
          );
        })}
      </div>
      <Button
        style={{color: '#FA541C', marginBottom: '1rem'}}
        onClick={() => {
          append({name: '', type: order === 0 ? 'start' : 'end', methodType: MethodTypeSchema.Enum.bus, time: '15', order});
        }}
      >
        <Iconify icon="octicon:plus-circle-16" width={25} sx={{mr: 0.5}} /> ポイントを追加
      </Button>
      <RHFTextField name={`TrailheadRouteGroup.${groupIndex}.remark`} label="補足" placeholder="補足情報を入力してください" sx={{m: 0}} />
    </div>
  );
}

type ARouteInputProps = {
  groupName: `TrailheadRouteGroup.${number}`;
  methods: ReturnType<typeof useTrailheadForm>;
  typeValue: SegmentTypeKeys;
  index: number;
};

function ARouteInput({groupName, methods, typeValue, index}: ARouteInputProps) {
  useEffect(() => {
    const methodType = methods.getValues(`${groupName}.routes.${index}.methodType`);
    if (typeValue === 'end') {
      methods.setValue(`${groupName}.routes.${index}.methodName`, '');
      methods.setValue(`${groupName}.routes.${index}.payment`, '');
      methods.setValue(`${groupName}.routes.${index}.url`, '');
      methods.setValue(`${groupName}.routes.${index}.methodType`, '');
      methods.setValue(`${groupName}.routes.${index}.time`, '');
      return undefined;
    }

    if (methodType === '') {
      methods.setValue(`${groupName}.routes.${index}.methodType`, MethodTypeSchema.Enum.bus);
    }

    return undefined;
  }, [typeValue]);
  return (
    <div style={{marginTop: '1.5rem'}}>
      名前（駅名など）
      <RHFTextField size="small" name={`${groupName}.routes.${index}.name`} placeholder="例：新宿" style={{marginBottom: '1rem'}} />
      {typeValue !== 'end' && (
        <>
          移動手段の名前
          <RHFTextField size="small" name={`${groupName}.routes.${index}.methodName`} placeholder="例：特急しなの" style={{marginBottom: '1rem'}} />
        </>
      )}
      {typeValue !== 'end' && (
        <>
          値段
          <RHFTextField
            type="number"
            size="small"
            name={`${groupName}.routes.${index}.payment`}
            placeholder="例：7000"
            style={{marginBottom: '1rem'}}
          />
        </>
      )}
      {typeValue !== 'end' && (
        <>
          url
          <RHFTextField
            size="small"
            name={`${groupName}.routes.${index}.url`}
            placeholder="例：https://yama-ikitai.com"
            style={{marginBottom: '1rem'}}
          />
        </>
      )}
      タイプ
      <RHFSelectBox
        nullable={false}
        size="small"
        placeholder="タイプ"
        name={`${groupName}.routes.${index}.type`}
        style={{marginBottom: '1rem'}}
        options={Object.keys(SegmentTypeSchema.Enum).map((key) => ({
          label: (SegmentTypeSchemaJp as any)[key], // todo: fix
          value: key,
        }))}
      />
      {typeValue !== 'end' && (
        <>
          手段(電車・バス・タクシー・徒歩)
          <RHFSelectBox
            size="small"
            placeholder="タイプ"
            nullable={false}
            disabled={false}
            name={`${groupName}.routes.${index}.methodType`}
            style={{marginBottom: '1rem'}}
            options={Object.keys(MethodTypeSchema.Enum).map((key) => ({
              label: (MethodTypeSchemaJp as any)[key], // todo: fix
              value: key,
            }))}
          />
        </>
      )}
      {typeValue !== 'end' && (
        <>
          時間
          <RHFSelectBox
            size="small"
            name={`${groupName}.routes.${index}.time`}
            placeholder="時間"
            style={{marginBottom: '1rem'}}
            options={generateTimeOptions()}
          />
        </>
      )}
    </div>
  );
}

type SegmentTypeKeys = keyof typeof SegmentTypeSchema.Enum;

const SegmentTypeSchemaJp: Record<SegmentTypeKeys, string> = {
  start: 'スタート',
  end: 'ゴール',
  middle: '中間地点',
};

type MethodTypeKeys = keyof typeof MethodTypeSchema.Enum;
const MethodTypeSchemaJp: Record<MethodTypeKeys, string> = {
  train: '電車',
  bus: 'バス',
  walk: '徒歩',
  taxi: 'タクシー',
};

export function Route({
  point,
  idx,
  groupIndex,
}: {
  point: NonNullable<(typeof TrailheadCreateInputObjectSchema)['_type']['TrailheadRouteGroup']>[0]['routes'][0];
  idx: number;
  groupIndex: number;
}) {
  const {openModal} = useModalState(RoutesInputModalAtom);
  return (
    <>
      {/* 地点 */}
      <div
        style={{
          fontSize: '16px',
          fontWeight: 'bolder',
          color: '#fff',
          letterSpacing: point.name.length < 6 ? '0.2rem' : '',
          background: '#71BFD8',
          height: '100%',
          borderRadius: '3px',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gridColumn: '1/ 13',
          gridRow: `${idx * 3 + 1}`,
        }}
      >
        <Button style={{color: '#FFF'}} onClick={() => openModal({idx, groupIndex})}>
          <Iconify icon="akar-icons:edit" width={25} sx={{mr: 0}} />
          {point.name === '' && '編集する'}
        </Button>
        {point.name}
      </div>
      {/* 時間 */}
      {point.time && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            fontSize: '12px',
            color: '#636363',
            height: '100%',
            borderRadius: '3px',
            gridColumn: '1/ 5',
            gridRow: `${idx * 3 + 2}`,
          }}
        >
          {convertMinutesToTime(Number(point.time))}
        </div>
      )}
      {/* 移動手段の名前 */}
      {point.methodName && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            fontSize: '13px',
            color: '#636363',
            height: '100%',
            gridColumn: '7/ 13',
            gridRow: `${idx * 3 + 2}`,
          }}
        >
          {point.url ? (
            <a
              href={point.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{textDecoration: 'underline', color: '#636363', display: 'flex', alignItems: 'center'}}
            >
              {point.methodName}
              <Iconify icon="gridicons:external" width={19} />
            </a>
          ) : (
            <span style={{color: '#636363', alignItems: 'center'}}>{point.methodName}</span>
          )}
        </div>
      )}
      {/* 値段 */}
      {point.payment && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            fontSize: '12px',
            color: '#636363',
            gridColumn: '10/ 13',
            gridRow: `${idx * 3 + 3}`,
          }}
        >
          ¥{point.payment.toLocaleString()}
        </div>
      )}
      {/* 線 */}
      {point.type !== 'end' && (
        <>
          {point.methodType === 'bus' && (
            <div
              style={{
                borderLeft: '3px solid #FFE500',
                height: '100%',
                gridColumn: '7',
                gridRow: `${idx * 3 + 2} / ${idx * 3 + 4}`,
              }}
            />
          )}
          {point.methodType === 'train' && (
            <div
              style={{
                background: 'linear-gradient(to bottom, black 50%, white 50%)',
                backgroundSize: '100% 14px',
                width: '2.5px',
                height: '100%',
                gridColumn: '7',
                gridRow: `${idx * 3 + 2} / ${idx * 3 + 4}`,
                boxShadow: '0.7px 0 0 0 black, -0.7px 0 0 0 black',
              }}
            />
          )}
          {point.methodType === 'walk' && (
            <div
              style={{
                borderLeft: '3px dotted #C0C0C0',
                height: '100%',
                gridColumn: '7',
                gridRow: `${idx * 3 + 2} / ${idx * 3 + 4}`,
              }}
            />
          )}
          {point.methodType === 'taxi' && (
            <div
              style={{
                borderLeft: '3px solid #FF2E3A',
                height: '100%',
                gridColumn: '7',
                gridRow: `${idx * 3 + 2} / ${idx * 3 + 4}`,
              }}
            />
          )}
        </>
      )}
    </>
  );
}
