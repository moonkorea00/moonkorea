import styled from 'styled-components';

export const Container = styled.section`
  ${({ theme }) => theme.flexColumn}
  padding: 1px 12px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.base.gray300};
  line-height: 150%;
  transition: margin-left ease 0.3s;

  &:hover {
    margin-left: 5px;
  }
`;

export const Title = styled.h2`
  font-size: 1.65em;
  word-break: keep-all;

  @media screen and (max-width: 768px) {
    font-size: 1.4em;
  }
`;

export const Description = styled.h3`
  font-size: 1em;
  color: ${({ theme }) => theme.colors.base.black};
  font-weight: 600;

  @media screen and (max-width: 768px) {
    font-size: 0.85em;
  }
`;

export const PublishDate = styled.h4`
  font-size: 0.8em;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.base.black};

  @media screen and (max-width: 768px) {
    font-size: 0.75em;
  }
`;