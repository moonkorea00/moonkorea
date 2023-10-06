/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Comment, RawComment } from '@@types/comments';

export const nestCommentsWithChildren = (comments: RawComment[]) => {
  const map = new Map();
  const commentsWithChildren = comments.reduce<Comment[]>((arr, comment, i) => {
    map.set(comment.id, i);
    const parentIdIdx = map.get(comment.parentId);
    (comment as Comment).children = [];
    (comments[parentIdIdx] as Comment)?.children.push(comment as Comment);

    return (comment.parentId ? arr : [...arr, comment]) as Comment[];
  }, [] as Comment[]);

  return commentsWithChildren;
};

export const getActiveComments = (comments: RawComment[]) =>
  comments.map(el =>
    el.isDeleted
      ? {
          ...el,
          body: null,
          user: { ...el.user, name: null, email: null, image: null },
        }
      : el
  );

export const addDepthKeyToElement = (arr: Comment[]) => {
  const maxDepth = 50;
  const addDepthKeyRecursively = (el: Comment, depth = 1): Comment => {
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
  (val: RawComment[]) =>
    fns.reduce((acc, fn) => fn(acc), val);
