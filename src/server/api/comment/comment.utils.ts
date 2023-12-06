/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Comment, RawComment } from '@@types/comments';

export const nestComments = (comments: RawComment[]) => {
  const root: Comment[] = [];
  const map: Map<string, Comment> = new Map();

  const commentsWithChildren: Comment[] = comments.map(comment => ({
    ...comment,
    children: [],
    depth: 0,
  }));

  commentsWithChildren.forEach(comment => {
    map.set(comment.id, comment);

    if (comment.parentId) {
      const parent = map.get(comment.parentId);

      if (parent) {
        comment.depth = parent.depth + 1;
        return parent.children.push(comment);
      }
    }

    root.push(comment);
  });

  return root;
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
