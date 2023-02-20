import styled, { css } from 'styled-components';

interface ChildrenCommentStyleProps {
  parentId?: string;
  depth: number;
}

export const Container = styled.div`
  ${({ theme }) => theme.flexColumn}
  width : 100%;
  min-height: 100px;
  margin: 12px 0 12px 0;
  border: 1px solid #f0f3f5;
  border-radius: 6px;

  ${({ parentId, depth }: ChildrenCommentStyleProps) => css`
    padding: ${parentId ? '7px 0px 7px 15px' : '7px 7px 7px 15px'};
    border-right: ${parentId && depth !== 2 && 'none'};
    border-top-right-radius: ${depth >= 3 && '0'};

    @media screen and (max-width: 768px) {
      padding: ${parentId ? '3px 0px 3px 8px' : '3px 3px 3px 8px'};
    }
  `}
`;

export const FlexWrapContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export const ContentContainer = styled.div`
  width: calc(100% - 44px);
  height: 100%;
  padding-left: 18px;

  @media screen and (max-width: 768px) {
    padding-left: 10px;
  }
`;

export const UpperContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
`;

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

export const User = styled.span`
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

export const Option = styled.button`
  padding: 0 10px 0 0;
  font-size: 14px;
  font-weight: 400;
  color: rgb(105, 105, 105);
  background-color: inherit;
  ${({ isAuthor }: { isAuthor?: boolean }) =>
    isAuthor &&
    css`
      color: rgb(0, 0, 0);
    `}

  &:hover {
    color: rgb(0, 0, 0);
    text-decoration: underline;
  }

  &:last-child {
    margin-right: 2px;
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

export const Content = styled.div`
  font-size: 0.95em;
  line-height: 26px;
  color: ${({ isDeleted }: { isDeleted: boolean }) => isDeleted && '#565656'};
`;