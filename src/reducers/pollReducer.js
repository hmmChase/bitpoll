const intialState = { voteBtnDisabled: true };

export const pollReducer = (state = intialState, action) => {
  switch (action.type) {
  case 'STORE_SELECTED_OPTION':
    return { ...state, selectedOption: action.option };
  case 'STORE_OPTION_VALUE':
    return { ...state, value: action.value };
  case 'STORE_VOTE_BTN_DISABLED':
    return { ...state, voteBtnDisabled: action.boolean };
  case 'STORE_OPTION1_TALLY':
    return { ...state, option1Tally: action.tally };
  case 'STORE_OPTION2_TALLY':
    return { ...state, option2Tally: action.tally };
  default:
    return state;
  }
};
