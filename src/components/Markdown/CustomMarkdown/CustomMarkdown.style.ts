import styled from 'styled-components';
import { colors } from '@styles/colors';

export const MarkdownBlockquote = styled.blockquote`
  margin: 30px 0;
  padding: 0 15px;
  color: #858585;
  border-left: 4px solid ${colors.gray200};
`;

export const MarkdownH1 = styled.h1`
  margin-top: 20px;
  padding-bottom: 8px;
  font-size: 1.8em;
  border-bottom: 1px solid ${colors.gray300};

  @media screen and (max-width: 768px) {
    font-size: 1.6em;
  }
`;

export const MarkdownH2 = styled.h2`
  font-size: 1.55em;

  @media screen and (max-width: 768px) {
    font-size: 1.3em;
  }
`;

export const MarkdownH3 = styled.h3`
  font-size: 1.35em;
  margin-bottom: -10px;

  @media screen and (max-width: 768px) {
    font-size: 1.15em;
  }
`;

export const MarkdownP = styled.p`
  @media screen and (max-width: 768px) {
    font-size: 0.95em;
  }
`;

export const MarkdownSpan = styled.span`
  display: block;
  margin-bottom: 12px;
  font-size: 0.9em;
  font-weight: 500;
  font-style: italic;
  color: ${colors.gray600};
  text-align: center;
`;