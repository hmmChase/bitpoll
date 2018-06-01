const initialState = { isContributor: false };

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'STORE_USER':
    return { ...state, ...action.user };
  case 'STORE_LOG_OUT':
    return { ...state, displayName: '', userId: '' };
  case 'STORE_IS_CONTRIBUTOR':
    return { ...state, isContributor: action.boolean };
  default:
    return state;
  }
};
