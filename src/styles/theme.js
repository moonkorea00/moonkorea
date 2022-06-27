import { css } from 'styled-components';

const theme = {
  flexStart: css`
    display: flex;
    justify-content: flex-start;
    align-items: center;
  `,
  flexCenter: css`
    display: flex;
    justify-content: center;
    align-items: center;
  `,
  InlineFlexStart: css`
    display: inline-flex;
    justify-content: flex-start;
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
    background-color: #fafafa;
  `,
};

export default theme;
