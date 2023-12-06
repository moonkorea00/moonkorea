import 'styled-components';

interface ColorPalette {
  base: {
    white: string;
    black: string;
    lightOrange: string;
    pinkGrey: string;
    darkYellow: string;
    grayDefault: string;
    gray100: string;
    gray200: string;
    gray300: string;
    gray400: string;
    gray500: string;
    gray600: string;
    gray700: string;
    gray800: string;
  };
  secondary: {
    light: string;
    main: string;
    dark: string;
  };
  action: {
    default: string;
    delete: string;
  };
  overlay: string;
  shadow: { default: string };
}

interface ThemeColors {
  base: ColorPalette['base'];
  secondary: ColorPalette['secondary'];
  action: ColorPalette['action'];
  overlay: ColorPalette['overlay'];
  shadow: {
    default: ColorPalette['shadow']['default'];
  };
}

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: ThemeColors;
    flexCenter: ThemedCssFunction;
    flexDefault: ThemedCssFunction;
    flexColumn: ThemedCssFunction;
    flexColumnCenter: ThemedCssFunction;
    flexCenterEnd: ThemedCssFunction;
    flexSpaceBetween: ThemedCssFunction;
    flexAlignCenter: ThemedCssFunction;
  }
}
