import styled from 'styled-components';
import { colors } from '@styles/colors';

export const Container = styled.div`
  ${({ theme }) => theme.flexColumn}
  max-width: 800px;
  height: 100%;
  padding: 50px 20px;
`;

export const Title = styled.h1`
  margin-bottom: -10px;
  font-size: 40px;
  font-weight: 900;
`;

export const Description = styled.p`
  color: ${colors.gray300};
  font-size: 22px;
  font-weight: 500;
`;

export const Date = styled.span`
  padding: 3px 8px;
  font-size: 0.85em;
  border-radius: 10px;
  color: ${colors.black};
  background-color: ${colors.pinkGrey};
`;

export const TagContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 14px;
  gap: 6px;
`;

export const Tags = styled.span`
  padding: 3px 8px;
  font-size: 0.85em;
  font-weight: 500;
  border-radius: 10px;
  background-color: ${colors.darkYellow};
`;
