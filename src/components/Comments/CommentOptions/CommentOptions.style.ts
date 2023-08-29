import styled from 'styled-components';

export const Container = styled.div`
  position: absolute;
  top: 30px;
  right: 20px;
  ${({ theme }) => theme.flexColumnCenter}
  width: 100px;
  padding: 4px 0px 4px;
  background: ${({ theme }) => theme.colors.base.white};
  border: 1px solid ${({ theme }) => theme.colors.base.gray100};
  border-radius: 8px;
  box-shadow: 0 5px 16px ${({ theme }) => theme.colors.shadow.default};
  z-index: 1;

  @media screen and (max-width: 768px) {
    right: -4px;
  }
`;

export const Option = styled.button`
  width: 100%;
  height: 100%;
  padding: 8px 0;
  color: ${({ theme }) => theme.colors.secondary.main};
  font-weight: 500;
  background-color: inherit;
  border-bottom: 1px solid ${({ theme }) => theme.colors.base.gray100};

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    font-weight: 700;
  }
`;
