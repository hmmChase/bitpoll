const intialState = {};

export const contribReducer = (state = intialState, action) => {
  switch (action.type) {
  case 'STORE_CONTRIBUTORS':
    return { ...state, ...action.contributors };

  default:
    return state;
  }
};
