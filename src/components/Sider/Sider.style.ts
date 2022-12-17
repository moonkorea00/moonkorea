import styled from "styled-components";

export const Container = styled.aside`
  width: 440px;
  height: 100%;
  padding: 16px 16px 0 20px;
  background-color: #fafafa;
  overflow-y: scroll;
  overscroll-behavior-y: none;

  ::-webkit-scrollbar {
    display: none;
}
`;