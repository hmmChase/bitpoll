const initialState = {};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOG_IN':
      return { ...state, ...action.user };
    case 'LOG_OUT':
      console.log('logout3');

      return { ...state, displayName: '', userId: '' };

    default:
      return state;
  }
};
