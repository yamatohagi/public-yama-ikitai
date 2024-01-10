import {css} from 'styled-system/css';

function RadioButton({option, idx, value, handleChange}: any) {
  return (
    <label
      htmlFor={option}
      key={idx}
      className={css({
        display: 'flex',
        alignItems: 'center',
        cursor: 'pointer',
      })}
    >
      <span
        className={css({
          display: 'inline-block',
          width: '20px',
          height: '20px',
          borderRadius: '50%',
          border: '2px solid #C0C0C0',
          marginRight: '5px',
          marginLeft: '10px',
          position: 'relative',
        })}
      >
        <input
          type="radio"
          id={option}
          name="transportMethod"
          value={option}
          checked={value === option}
          onChange={handleChange}
          className={css({
            opacity: 0,
            position: 'absolute',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            ml: 0,
            cursor: 'pointer',
          })}
        />
        {value === option && (
          <span
            className={css({
              display: 'block',
              width: '10px',
              height: '10px',
              backgroundColor: '#367B9D',
              borderRadius: '50%',
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            })}
          />
        )}
      </span>
      <span
        className={css({
          fontSize: '0.9rem',
          color: '#323232',
          fontWeight: 'semibold',
        })}
      >
        {option}
      </span>
    </label>
  );
}

export default RadioButton;
