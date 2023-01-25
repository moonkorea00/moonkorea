import { css, DefaultTheme } from 'styled-components';

const theme: DefaultTheme = {
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
