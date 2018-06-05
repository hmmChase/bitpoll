import { userReducer } from '../userReducer';
import * as actions from '../../actions';

describe('userReducer', () => {
  let state;
  beforeEach(() => {
    state = { isContributor: false, ifVoted: false };
  });

  it('returns a default state', () => {
    const action = { type: 'MOCK_ACTION' };

    expect(userReducer(state, action)).toEqual(state);
  });

  it('returns a new state when called with a STORE_USER action', () => {
    const user = { name: 'satoshi', id: 1111 };

    expect(userReducer(state, actions.storeUser(user))).toEqual({
      ...state,
      ...user
    });
  });

  it('returns a new state when called with a STORE_LOG_OUT action', () => {
    const user = { name: 'satoshi', id: 1111 };
    state = {
      isContributor: false,
      ifVoted: false,
      displayName: 'chase',
      userId: '123'
    };

    expect(userReducer(state, actions.storeLogOut(user))).toEqual({
      ...state,
      displayName: '',
      userId: ''
    });
  });

  it('returns a new state when called with a STORE_IS_CONTRIBUTOR action', () => {
    const boolean = true;

    expect(userReducer(state, actions.storeIsContributor(boolean))).toEqual({
      ...state,
      isContributor: true
    });
  });

  it('returns a new state when called with a STORE_IF_VOTED action', () => {
    const boolean = true;

    expect(userReducer(state, actions.storeIfVoted(boolean))).toEqual({
      ...state,
      ifVoted: true
    });
  });
});
