import styled from 'styled-components';

export const BlockQuote = styled.blockquote`
  margin: 30px 0;
  padding: 0 15px;
  color: #858585;
  border-left: 4px solid ${({ theme }) => theme.colors.base.gray200};
`;

export const H1 = styled.h1`
  display: block;
  margin-top: 20px;
  padding-bottom: 8px;
  margin-block-start: 0.67em;
  margin-block-end: 0.67em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  font-size: 2em;
  font-weight: 700;
  border-bottom: 1px solid ${({ theme }) => theme.colors.base.gray300};

  :hover:after {
    content: '#';
  }

  @media screen and (max-width: 768px) {
    font-size: 1.8em;
  }
`;

export const H2 = styled.h2`
  display: block;
  margin-block-start: 0.83em;
  margin-block-end: 0.83em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  font-size: 1.6em;
  font-weight: 700;
  padding-bottom: 8px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.base.gray300};

  :hover:after {
    content: '#';
  }

  @media screen and (max-width: 768px) {
    font-size: 1.4em;
  }
`;

export const H3 = styled.h3`
  display: block;
  margin-block-start: 1em;
  margin-block-end: 1em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  font-size: 1.17em;
  font-weight: 700;

  :hover:after {
    content: '#';
  }
`;

export const P = styled.p`
  @media screen and (max-width: 768px) {
    font-size: 0.95em;
  }
`;

export const Span = styled.span`
  display: block;
  margin-bottom: 12px;
  font-size: 0.9em;
  font-weight: 500;
  font-style: italic;
  color: ${({ theme }) => theme.colors.base.gray600};
  text-align: center;
`;
