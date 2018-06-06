import { pollReducer } from '../pollReducer';
import * as actions from '../../actions';

describe('pollReducer', () => {
  let state;
  beforeEach(() => {
    state = { voteBtnDisabled: true };
  });

  it('returns a default state', () => {
    const action = { type: 'MOCK_ACTION' };

    expect(pollReducer(state, action)).toEqual(state);
  });

  it('returns a new state when called with a STORE_SELECTED_OPTION action', () => {
    const option = 'option1';

    expect(pollReducer(state, actions.storeSelectedOption(option))).toEqual({
      ...state,
      selectedOption: 'option1'
    });
  });

  it('returns a new state when called with a STORE_OPTION_VALUE action', () => {
    const value = 43;

    expect(pollReducer(state, actions.storeOptionValue(value))).toEqual({
      ...state,
      value: 43
    });
  });

  it('returns a new state when called with a STORE_VOTE_BTN_DISABLED action', () => {
    const boolean = false;

    expect(pollReducer(state, actions.storeVoteBtnDisabled(boolean))).toEqual({
      ...state,
      voteBtnDisabled: false
    });
  });

  it('returns a new state when called with a STORE_OPTION1_TALLY action', () => {
    const tally = 32;

    expect(pollReducer(state, actions.storeOption1Tally(tally))).toEqual({
      ...state,
      option1Tally: 32
    });
  });

  it('returns a new state when called with a STORE_OPTION2_TALLY action', () => {
    const tally = 32;

    expect(pollReducer(state, actions.storeOption2Tally(tally))).toEqual({
      ...state,
      option2Tally: 32
    });
  });
});
