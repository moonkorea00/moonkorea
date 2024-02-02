import styled, { css } from 'styled-components';

interface ChildrenCommentStyleProps {
  parentId: string | null;
  depth: number;
}

export const Container = styled.div<ChildrenCommentStyleProps>`
  ${({ theme }) => theme.flexColumn}
  width : 100%;
  min-height: 100px;
  margin: 12px 0 12px 0;
  border: 1px solid #f0f3f5;
  border-radius: 6px;

  ${({ parentId, depth }) => css`
    padding: ${parentId ? '7px 0px 7px 15px' : '7px 7px 7px 15px'};
    border-right: ${parentId && depth !== 2 && 'none'};
    border-top-right-radius: ${depth >= 3 && '0'};

    @media screen and (max-width: 768px) {
      padding: ${parentId ? '3px 0px 3px 8px' : '3px 3px 3px 8px'};
    }
  `}
`;

export const CommentContainer = styled.div`
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
