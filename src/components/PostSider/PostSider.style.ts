import styled from 'styled-components';

interface SiderContainerProps {
  isMounted: boolean;
  headerHeight: number;
  scrollDirection: 'up' | 'down' | null;
}

export const Container = styled.section<SiderContainerProps>`
  position: fixed;
  top: ${({ headerHeight }) => headerHeight}px;
  right: 55px;
  display: ${({ isMounted }) => (isMounted ? 'flex' : 'none')};
  flex-direction: column;
  gap: 16px;
  margin-top: 60px;
  background-color: white;

  @media screen and (max-width: 1024px) {
    width: fit-content;
    top: unset;
    bottom: 0;
    left: 50%;
    flex-direction: row;
    gap: 10px;
    padding: 4px 20px;
    border: 1px solid ${({ theme }) => theme.colors.base.gray300};
    border-radius: 25px;
    transition: transform 0.4s ease-in-out;
    transform: ${({ scrollDirection }) =>
      scrollDirection === 'down'
        ? 'translate(-50%, -50%)'
        : 'translate(-50%, 300%)'};
  }

  @media screen and (max-width: 768px) {
    transform: ${({ scrollDirection }) =>
      scrollDirection === 'down'
        ? 'translate(-50%, -30%)'
        : 'translate(-50%, 300%)'};
  }
`;

export const SiderButton = styled.button`
  position: relative;
  width: 40px;
  height: 40px;
  background-color: white;
  border: 1px solid ${({ theme }) => theme.colors.base.gray300};
  border-radius: 8px;

  &:hover {
    background-color: ${({ theme }) => theme.colors.base.grayDefault};
  }

  @media screen and (max-width: 1024px) {
    width: 36px;
    height: 36px;
    border: none;
  }
`;

export const ButtonImageContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

export const ButtonImage = styled.img`
  color: ${({ theme }) => theme.colors.base.gray300};
`;

export const Seperator = styled.div`
  display: none;

  @media screen and (max-width: 1024px) {
    display: block;
    border-right: 1px solid ${({ theme }) => theme.colors.base.gray300};
  }
`;
