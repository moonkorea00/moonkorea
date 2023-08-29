import styled from 'styled-components';

export const Container = styled.section`
  ${({ theme }) => theme.flexColumn}
  padding: 1px 12px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.base.gray300};
  line-height: 150%;
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
  background-color: ${({ theme }) => theme.colors.base.gray200};

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
  color: ${({ theme }) => theme.colors.base.black};

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
