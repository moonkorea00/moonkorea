import { css, DefaultTheme } from 'styled-components';

const colors = {
  base: {
    white: '#FFF',
    black: '#000',
    lightOrange: '#b99374',
    pinkGrey: '#D0CDEB',
    darkYellow: '#E6E3BE',
    grayDefault: '#FAFAFA',
    gray100: '#F5F5F5',
    gray200: '#EDEDED',
    gray300: '#E5E5E5',
    gray400: '#A2A2A2',
    gray500: '#888888',
    gray600: '#6E6E6E',
    gray700: '#565656',
    gray800: '#323232',
  },
  secondary: {
    light: '#4b84b4',
    main: '#4081C4',
    dark: '#3C7AB7',
  },
  action: {
    default: '#FFF',
    delete: '#D32F2E',
  },
  overlay: 'rgba(0, 0, 0, 0.2)',
  shadow: { default: 'rgba(0, 0, 0, 0.1)' },
};

const theme: DefaultTheme = {
  colors,
  flexCenter: css`
    display: flex;
    justify-content: center;
    align-items: center;
  `,
  flexDefault: css`
    display: flex;
    align-items: center;
  `,
  flexColumn: css`
    display: flex;
    flex-direction: column;
  `,
  flexColumnCenter: css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  `,
  flexCenterEnd: css`
    display: flex;
    justify-content: center;
    align-items: flex-end;
  `,
  flexSpaceBetween: css`
    display: flex;
    justify-content: space-between;
    align-items: center;
  `,
  flexAlignCenter: css`
    display: flex;
    align-items: center;
  `,
};

export default theme;
