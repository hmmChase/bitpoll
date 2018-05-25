const initialState = {};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_USER':
      return { ...state, ...action.user };

    default:
      return state;
  }
};
