import styled from "styled-components";

export const CommentHeader = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
`;

export const Author = styled.span`
  margin-right: 10px;
  font-weight: 700;

  @media screen and (max-width: 768px) {
    margin-right: 6px;
    font-size: 0.95em;
  }
`;

export const PublishDate = styled.span`
  font-size: 13px;

  @media screen and (max-width: 768px) {
    font-size: 12px;
  }
`;

export const OptionsButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  border-radius: 50%;
  background-color: inherit;

  @media screen and (max-width: 768px) {
    right: -24px;
  }
`;