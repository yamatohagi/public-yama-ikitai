import {useFormContext} from 'react-hook-form';

export default function RHFDate({label, name}: {label: string; name: string}) {
  const {
    register,
    setValue,
    formState: {errors},
  } = useFormContext();

  const error = errors[name]?.message || '';

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {value} = e.target;

    setValue(name, !!value && value !== '' ? value : null); // 値が空文字の場合にnullを設定
  };

  return (
    <>
      <label htmlFor={name}>{label}</label>
      <div style={{position: 'relative'}}>
        <input
          type="date"
          id={name}
          {...register(name)} // ここでregister関数を使用してinput要素をreact-hook-formに連携
          onChange={handleInputChange}
        />
        {error && <span style={{color: 'red', fontSize: '12px'}}>{error.toString()}</span>}
      </div>
    </>
  );
}
