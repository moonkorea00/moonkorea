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
  comments.map(el => {
    return el.isDeleted
      ? {
          ...el,
          body: null,
          user: { ...el.user, name: null, email: null, image: null },
        }
      : el;
  });

export const addDepthKeyToElement = (
  arr: CommentProps[],
  depth = 1
): CommentProps[] =>
  arr?.map(el => {
    return {
      ...el,
      depth,
      children: addDepthKeyToElement(el.children, depth + 1),
    };
  });

export const pipe =
  (...fns: Function[]) =>
  (val: RawCommentProps[]) =>
    fns.reduce((acc, fn) => fn(acc), val);
