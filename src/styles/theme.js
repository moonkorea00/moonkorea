import { css } from 'styled-components';

const theme = {
  flexCenter: css`
    display: flex;
    justify-content: center;
    align-items: center;
  `,
  flexSpaceBetween: css`
    display: flex;
    justify-content: space-between;
    align-items: center;
  `,
  flexSpaceAround: css`
    display: flex;
    justify-content: space-around;
    align-items: center;
  `,

  bg: css`
    background-color: #FAFAFA;
  `
};

export default theme;
