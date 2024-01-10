import GlobalStyles from '@mui/system/GlobalStyles';

export default function StyledProgressBar() {
  const inputGlobalStyles = (
    <GlobalStyles
      styles={{
        '#nprogress': {
          pointerEvents: 'none',
          '.bar': {
            top: 0,
            left: 0,
            height: 2,
            zIndex: 9999,
            width: '100%',
            position: 'fixed',
            backgroundColor: '#FA541C',
            boxShadow: `0 0 2px #FA541C`,
          },
          '.peg': {
            right: 0,
            opacity: 1,
            width: 100,
            height: '100%',
            display: 'block',
            position: 'absolute',
            transform: 'rotate(3deg) translate(0px, -4px)',
            boxShadow: `0 0 10px #FA541C, 0 0 5px #FA541C`,
          },
        },
      }}
    />
  );

  return inputGlobalStyles;
}
