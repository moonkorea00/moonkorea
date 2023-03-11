import styled from 'styled-components';
import { colors } from '@styles/colors';

export const Container = styled.aside`
  position: sticky;
  top: 54px;
  width: 360px;
  min-width: 320px;
  height: calc(100vh - 54px);
  padding: 16px 16px 0 20px;
  line-height: 35px;
  background-color: ${colors.grayDefault};
  border-left: 1px solid ${colors.gray300};
  overflow-y: scroll;
  overscroll-behavior-y: none;

  @media screen and (max-width: 1024px) {
    display: ${({ isSiderVisible }: { isSiderVisible: boolean }) =>
      isSiderVisible ? 'block' : 'none'};
  }

  ::-webkit-scrollbar {
    display: none;
  }
`;
