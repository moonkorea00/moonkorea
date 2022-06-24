const initialState = {
  article: null,
};

const SELECT_ARTICLE = 'SELECT_ARTICLE';

export const selectArticle = (blog) => dispatch => {
  dispatch({ type: SELECT_ARTICLE, blog });
};

export const article = (state = initialState, action) => {
  switch (action.type) {
    case SELECT_ARTICLE:
      return { article: action.blog };
    default:
      return state;
  }
};
