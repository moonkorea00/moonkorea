import styled, { css } from 'styled-components';

export const Option = styled.button<{ isSelected?: boolean }>`
  padding: 4px 10px;
  font-size: 14px;
  border-radius: 10px;

  ${({ theme, isSelected }) => css`
    border: 1px solid ${theme.colors.base.gray300};
    background-color: ${isSelected ? '#e5f0ff' : 'white'};
    opacity: ${!isSelected && '0.6'};
  `}

  span {
    font-size: 12px;
  }

  &:hover {
    opacity: 1;
  }

  @media screen and (max-width: 768px) {
    font-size: 13px;

    span {
      font-size: 11px;
    }
  }
`;
