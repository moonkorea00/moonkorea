import styled from 'styled-components';

export const MarkdownBlockquote = styled.blockquote`
  /* margin-bottom: 0.85em; */
  margin: 30px 0;
  padding: 0 15px;
  color: #858585;
  border-left: 4px solid #e5e5e5;
`;

export const MarkdownTitle = styled.h1`
  margin-top: 4vh;
  padding-bottom: 1vh;
  font-size: 1.8em;
  border-bottom: 1px solid rgb(219, 219, 219);
`;

export const MarkdownSubTitle = styled.h2`
font-size: 1.4em;
/* padding-bottom: 1vh; */
`;

export const MarkdownHeader = styled.h3`
  color: rgb(107, 107, 107);
  margin-bottom: -10px;
`;

export const MarkdownImage = styled.img`
  display: block;
  margin: 0 auto 2vh auto;
`;

export const MarkdownSpan = styled.span`
  display: block;
  margin-bottom: 12px;
  font-size: 0.9em;
  font-weight: 500;
  color: rgb(102, 102, 102);
  text-align: center;
`;
