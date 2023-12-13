import styled from 'styled-components';

export const Container = styled.header`
  position: relative;
  ${({ theme }) => theme.flexColumn};
  width: 100%;
  min-height: 300px;
  max-height: 800px;
  background-color: ${({ theme }) => theme.colors.secondary.light};
  color: ${({ theme }) => theme.colors.base.white};
`;

export const HeadingContainer = styled.div`
  ${({ theme }) => theme.flexCenter}
  min-height: 300px;
  max-height: 700px;
  background-color: ${({ theme }) => theme.colors.secondary.light};
`;
