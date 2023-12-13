import styled from 'styled-components';

export const Container = styled.nav`
  position: sticky;
  top: 130px;
  max-width: 264px;
  max-height: 560px;
  padding-bottom: 30px;
  margin-top: 40px;
  font-size: 0.8em;
  line-height: 26px;
  overflow-y: scroll;
  overscroll-behavior-y: none;

  ::-webkit-scrollbar {
    display: none;
  }

  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */

  @media screen and (max-width: 1200px) {
    display: none;
  }
`;
