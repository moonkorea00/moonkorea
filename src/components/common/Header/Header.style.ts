import styled from 'styled-components';
import { colors } from '@styles/colors';

export const Container = styled.header`
  position: relative;
  ${({ theme }) => theme.flexColumn};
  width:100%;
  min-height: 300px;
  max-height: 800px;
  background-color: ${colors.bgBlue};
  color: ${colors.white};
`;

export const HeadingContainer = styled.div`
  ${({ theme }) => theme.flexCenter}
  min-height: 300px;
  max-height: 700px;
  background-color: ${colors.bgBlue};
`;

export const FilledSection = styled.div`
  ${({ theme }) => theme.flexCenter}
  height: 50px;
  background-color: ${colors.lightOrange};
`;