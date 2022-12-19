import styled, { css } from 'styled-components';

// export const ViewPortContainer = styled.div`
//   /* ${({ isSiderVisible }: { isSiderVisible: boolean }) =>
//     isSiderVisible
//       ? css`
//           display: none;
//         `
//       : css`
//           display: block;
//         `} */
//   position: fixed;
//   top: 0;
//   right: 0;
//   bottom: 0;
//   left: 0;
//   /* margin-top:-54px; */
//   background-color: rgba(0, 0, 0, 0.12);
// `;

// ${({ isSiderVisible }: { isSiderVisible: boolean }) =>
//   isSiderVisible
//     ? css`
//         transform: translateX(0%);
//         /* transition: transform 0.3s; */
//       `
//     : css`
/* position: fixed;
    right: 0; */
//         transform: translateX(200%);
//         /* transition: transform 0.3s; */
//       `}
export const Container = styled.aside`
  width: 360px;
  height: 100%;
  padding: 16px 16px 0 20px;
  line-height: 35px;
  background-color: #fafafa;
  border-left: 1px solid #d3d3d3;
  overflow-y: scroll;
  overscroll-behavior-y: none;
  z-index: 1;

  @media screen and (max-width: 1023px) {
    display: ${({ isSiderVisible }: { isSiderVisible: boolean }) =>
      isSiderVisible ? 'block' : 'none'};
  }

  ::-webkit-scrollbar {
    display: none;
  }
`;
