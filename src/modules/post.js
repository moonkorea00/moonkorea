const initialState = {
  isListVisible: false,
};

const TOGGLE_LIST = 'TOGGLE_LIST';

export const toggleList = (dispatch) => () => {
  dispatch({ type: TOGGLE_LIST });
};

export const post = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_LIST:
      return { isListVisible: !state.isListVisible };
    default:
      return state;
  }
};
