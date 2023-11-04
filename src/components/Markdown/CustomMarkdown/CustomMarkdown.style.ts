import styled from 'styled-components';

export const BlockQuote = styled.blockquote`
  margin: 30px 0;
  padding: 0 15px;
  color: #858585;
  border-left: 4px solid ${({ theme }) => theme.colors.base.gray200};
`;

export const H1 = styled.h1`
  margin-top: 20px;
  padding-bottom: 8px;
  font-size: 1.8em;
  border-bottom: 1px solid ${({ theme }) => theme.colors.base.gray300};

  :hover:after {
    content: '#';
  }

  @media screen and (max-width: 768px) {
    font-size: 1.6em;
  }
`;

export const H2 = styled.h2`
  font-size: 1.55em;

  :hover:after {
    content: '#';
  }

  @media screen and (max-width: 768px) {
    font-size: 1.3em;
  }
`;

export const H3 = styled.h3`
  font-size: 1.35em;
  margin-bottom: -10px;

  :hover:after {
    content: '#';
  }

  @media screen and (max-width: 768px) {
    font-size: 1.15em;
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
