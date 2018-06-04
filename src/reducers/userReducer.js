const initialState = { isContributor: false, ifVoted: false };

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'STORE_USER':
      return { ...state, ...action.user };
    case 'STORE_LOG_OUT':
      return { ...state, displayName: '', userId: '' };
    case 'STORE_IS_CONTRIBUTOR':
      return { ...state, isContributor: action.boolean };
    case 'STORE_IF_VOTED':
      return { ...state, ifVoted: action.boolean };
    default:
      return state;
  }
};
