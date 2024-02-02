import styled from 'styled-components';

export const AvatarContainer = styled.div`
  width: 44px;
  height: 100%;
  padding-top: 8px;

  @media screen and (max-width: 768px) {
    width: 30px;
  }
`;

export const Avatar = styled.img`
  width: 100%;
`;
