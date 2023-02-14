import styled from 'styled-components';

export const Container = styled.div`
  position: absolute;
  top: 30px;
  right: 20px;
  ${({ theme }) => theme.flexColumnCenter}
  width: 100px;
  padding: 4px 0px 4px;
  background: #fff;
  border: 1px solid #f5f5f5;
  border-radius: 8px;
  box-shadow: 0 5px 16px rgba(0, 0, 0, 0.1);
  z-index: 1;

  @media screen and (max-width: 768px) {
    right: -4px;
  }
`;

export const Option = styled.button`
  width: 100%;
  height: 100%;
  padding: 8px 0;
  color: #3c6dba;
  font-weight: 500;
  background-color: inherit;
  border-bottom: 1px solid #f5f5f5;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    font-weight: 700;
  }
`;
