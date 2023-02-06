import { CommentProps, RawCommentProps } from '@@types/comments';

export const nestCommentsWithChildren = (comments: CommentProps[]) => {
  const map = new Map();
  const commentsWithChildren = comments?.reduce<CommentProps[]>(
    (arr, comment, i) => {
      map.set(comment.id, i);
      const parentIdIdx = map.get(comment.parentId);
      comment.children = [];
      comments[parentIdIdx]?.children.push(comment);

      return comment.parentId ? arr : [...arr, comment];
    },
    []
  );
  return commentsWithChildren;
};

export const getActiveComments = (comments: RawCommentProps[]) =>
  comments.map(el =>
    el.isDeleted
      ? {
          ...el,
          body: null,
          user: { ...el.user, name: null, email: null, image: null },
        }
      : el
  );

export const addDepthKeyToElement = (
  arr: CommentProps[],
  depth = 1,
  maxDepth = 50
): CommentProps[] | boolean => {
  if (depth > maxDepth) {
    throw new Error('Infinite loop found');
  }
  return arr?.map(el => ({
    ...el,
    depth,
    children: addDepthKeyToElement(el.children, depth + 1, maxDepth),
  })) as CommentProps[];
};

export const pipe =
  (...fns: Function[]) =>
  (val: RawCommentProps[]) =>
    fns.reduce((acc, fn) => fn(acc), val);
