import { CommentProps, RawCommentProps } from '@@types/comments';

export const nestCommentsWithChildren = (comments: RawCommentProps[]) => {
  const map = new Map();
  const commentsWithChildren = comments?.reduce<CommentProps[]>(
    (arr, comment, i) => {
      map.set(comment.id, i);
      const parentIdIdx = map.get(comment.parentId);
      const commentWithChildren = {
        ...comment,
        children: [],
        depth: 1,
      };
      arr[parentIdIdx]?.children.push(commentWithChildren);

      return comment.parentId ? arr : [...arr, commentWithChildren];
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

export const addDepthKeyToElement = (arr: CommentProps[]) => {
  const maxDepth = 50;
  const addDepthKeyRecursively = (
    el: CommentProps,
    depth = 1
  ): CommentProps => {
    if (depth > maxDepth) {
      throw new Error('Infinite loop found');
    }
    return {
      ...el,
      depth,
      children: el.children.map(child =>
        addDepthKeyRecursively(child, depth + 1)
      ),
    };
  };
  return arr.map(el => addDepthKeyRecursively(el));
};

export const pipe =
  (...fns: any[]) =>
  (val: RawCommentProps[]) =>
    fns.reduce((acc, fn) => fn(acc), val);
