import styled, { css } from 'styled-components';

interface HeadingProps {
  isHeadingInView: boolean;
}

export const Heading = styled.span<HeadingProps>`
  margin: 0;
  color: ${({ theme, isHeadingInView }) =>
    isHeadingInView ? theme.colors.secondary.main : '#555'};
  ${({ isHeadingInView }) => css`
    color: ${isHeadingInView ? '#004085' : '#555'};
    font-weight: ${isHeadingInView ? 800 : 'normal'};
  `}
  transition: 0.15s all ease-in-out;
  cursor: pointer;

  :hover,
  :focus {
    color: black;
    font-weight: 500;
    text-decoration: underline;
    text-decoration-thickness: 1px;
  }

  :active {
    font-weight: 700;
  }
`;
