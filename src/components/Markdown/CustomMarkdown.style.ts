import styled from 'styled-components';

export const MarkdownBlockquote = styled.blockquote`
  margin: 30px 0;
  padding: 0 15px;
  color: #858585;
  border-left: 4px solid #e5e5e5;
`;

export const MarkdownH1 = styled.h1`
  margin-top: 20px;
  padding-bottom: 8px;
  font-size: 1.8em;
  border-bottom: 1px solid rgb(219, 219, 219);

  @media screen and (max-width: 768px) {
    font-size: 1.6em;
  }
`;

export const MarkdownH2 = styled.h2`
  font-size: 1.55em;

  @media screen and (max-width: 768px) {
    font-size: 1.35em;
  }
`;

export const MarkdownH3 = styled.h3`
  font-size: 1.35em;
  margin-bottom: -10px;

  @media screen and (max-width: 768px) {
    font-size: 1.2em;
  }
`;

export const MarkdownSpan = styled.span`
  display: block;
  margin-bottom: 12px;
  font-size: 0.9em;
  font-weight: 500;
  font-style: italic;
  color: rgb(102, 102, 102);
  text-align: center;
`;
