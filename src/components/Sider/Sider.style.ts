import styled from 'styled-components';

export const Container = styled.aside`
  width: 360px;
  min-width: 310px;
  height: 100%;
  padding: 16px 16px 0 20px;
  line-height: 35px;
  background-color: #fafafa;
  border-left: 1px solid #d3d3d3;
  overflow-y: scroll;
  overscroll-behavior-y: none;
  z-index: 1;

  @media screen and (max-width: 1024px) {
    display: ${({ isSiderVisible }: { isSiderVisible: boolean }) =>
      isSiderVisible ? 'block' : 'none'};
  }

  ::-webkit-scrollbar {
    display: none;
  }
`;
