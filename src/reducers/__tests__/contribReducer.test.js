import { contribReducer } from '../contribReducer';
import * as actions from '../../actions';

describe('contribReducer', () => {
  it('returns a default state', () => {
    const state = {};
    const action = { type: 'MOCK_ACTION' };

    expect(contribReducer(state, action)).toEqual(state);
  });

  it('returns a new state when called with a STORE_CONTRIBUTORS action', () => {
    const state = {};
    const contributors = { 1111: { name: 'satoshi' } };

    expect(
      contribReducer(state, actions.storeContributors(contributors))
    ).toEqual(contributors);
  });
});
