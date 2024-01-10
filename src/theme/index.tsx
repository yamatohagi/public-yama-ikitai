import {useMemo} from 'react';
import {createTheme, ThemeOptions, ThemeProvider as MUIThemeProvider} from '@mui/material/styles';

//
import palette from './palette';
import typography from './typography';
import shadows from './shadows';
import componentsOverride from './overrides';
import customShadows from './customShadows';
import GlobalStyles from './globalStyles';

type Props = {
  children: React.ReactNode;
};

export default function ThemeProvider({children}: Props) {
  const themeOptions: ThemeOptions = useMemo(
    () => ({
      palette: palette('light'),
      typography,
      shape: {borderRadius: 8},
      direction: 'ltr',
      shadows: shadows('light'),
      customShadows: customShadows('light'),
    }),
    ['ltr', 'light']
  );

  const theme = createTheme(themeOptions);

  theme.components = componentsOverride(theme);

  return (
    <MUIThemeProvider theme={theme}>
      <GlobalStyles />
      {children}
    </MUIThemeProvider>
  );
}
