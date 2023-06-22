export const CACHE_KEYS = {
  comments: {
    list: ['comments'],
    detail: (id: string) => [...CACHE_KEYS.comments.list, id],
  },
};
