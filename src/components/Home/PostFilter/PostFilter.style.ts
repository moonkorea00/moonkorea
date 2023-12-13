import styled from 'styled-components';

export const Container = styled.section`
  ${({ theme }) => theme.flexColumn}
  gap: 8px;
`;

export const FilterList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  list-style: none;

  @media screen and (max-width: 768px) {
    gap: 6px;
  }
`;

export const ResetFilterButton = styled.button<{
  shouldRender?: string | string[];
}>`
  display: flex;
  align-items: center;
  align-self: end;
  gap: 4px;
  padding: 2px 8px;
  background-color: white;
  border: 1px solid ${({ theme }) => theme.colors.base.gray300};
  border-radius: 10px;
  visibility: ${({ shouldRender }) => (shouldRender ? 'visible' : 'hidden')};

  &:hover {
    border: 1px solid ${({ theme }) => theme.colors.base.gray400};
    transition: border 0.25s ease;
  }
`;
