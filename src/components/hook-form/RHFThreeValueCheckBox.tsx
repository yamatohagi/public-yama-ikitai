import React from 'react';
import {useFormContext, Controller} from 'react-hook-form';
import {css} from 'styled-system/css';

type StateComponentProps = {
  onChange: () => void;
  label: string;
};

// 未選択
const UnselectedState: React.FC<StateComponentProps> = ({onChange, label}) => (
  <label htmlFor={`${label}-unselected`} style={{display: 'flex', alignItems: 'center', cursor: 'pointer'}}>
    {/* 他の要素 */}
    <img
      className={css({marginRight: '0.7rem', marginTop: '3px', marginBottom: '3px'})}
      alt="icon"
      src="/assets/icons/three-value-check/unselected.svg"
      width={20}
      height={20}
    />
    <input type="checkbox" id={`${label}-unselected`} onChange={onChange} style={{display: 'none'}} />
    {label}
  </label>
);
// なし
const FalseState: React.FC<StateComponentProps> = ({onChange, label}) => (
  <label htmlFor={`${label}-false`} style={{display: 'flex', alignItems: 'center', cursor: 'pointer'}}>
    <img
      className={css({marginRight: '0.7rem', marginTop: '3px', marginBottom: '3px'})}
      alt="icon"
      src="/assets/icons/three-value-check/false.svg"
      width={20}
      height={20}
    />
    <input type="checkbox" id={`${label}-false`} onChange={onChange} style={{display: 'none'}} />
    {label}
  </label>
);

// あり
const TrueState: React.FC<StateComponentProps> = ({onChange, label}) => (
  <label htmlFor={`${label}-true`} style={{display: 'flex', alignItems: 'center', cursor: 'pointer'}}>
    <img
      className={css({marginRight: '0.7rem', marginTop: '3px', marginBottom: '3px'})}
      alt="icon"
      src="/assets/icons/three-value-check/true.svg"
      width={20}
      height={20}
    />
    <input type="checkbox" id={`${label}-true`} checked onChange={onChange} style={{display: 'none'}} />
    {label}
  </label>
);

export default function RHFThreeValueCheckBox({name, label}: {name: string; label: string}) {
  const {control} = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      // eslint-disable-next-line arrow-body-style
      render={({field, fieldState: {error}}) => {
        return (
          <div>
            <label htmlFor={`${label}-false`} style={{display: 'inline-flex', alignItems: 'center', cursor: 'pointer'}}>
              {/* その他のコンテンツ */}
              {field.value === 'false' && <FalseState onChange={() => field.onChange('null')} label={label} />}
              {field.value === 'true' && <TrueState onChange={() => field.onChange('false')} label={label} />}
              {field.value === 'null' && <UnselectedState onChange={() => field.onChange('true')} label={label} />}
              {error && <p style={{color: 'red'}}>{error.message}</p>}
            </label>
          </div>
        );
      }}
    />
  );
}
