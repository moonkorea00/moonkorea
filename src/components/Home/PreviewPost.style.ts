import styled from 'styled-components';
import { colors } from '@styles/colors';

export const Container = styled.section`
  ${({ theme }) => theme.flexColumn}
  margin: 0 auto;
  padding: 1px 12px;
  border-bottom: 1px solid #e6e6e6;
  line-height: 125%;
`;

export const TagContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
`;

export const Tags = styled.span`
  padding: 1px 8px;
  font-size: 0.85em;
  font-weight: 600;
  border-radius: 10px;
  background-color: ${colors.gray200};

  @media screen and (max-width: 768px) {
    font-size: 0.8em;
  }
`;

export const Title = styled.h2`
  font-size: 1.65em;

  @media screen and (max-width: 768px) {
    font-size: 1.4em;
  }
`;

export const Description = styled.h3`
  font-size: 1em;
  color: ${colors.black};

  @media screen and (max-width: 768px) {
    font-size: 0.85em;
  }
`;

export const PublishDate = styled.h4`
  font-size: 0.8em;
  font-weight: 400;
  color: ${colors.black};

  @media screen and (max-width: 768px) {
    font-size: 0.7.5em;
  }
`;
