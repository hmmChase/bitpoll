import { createStore } from 'redux';
import rootReducer from '../index';
import { userReducer } from '../userReducer';
import { contribReducer } from '../contribReducer';

const store = createStore(rootReducer);

describe('rootReducer', () => {
  it('checks that the intial state of the root reducer matches what the child reducer returns, given an empty action', () => {
    expect(store.getState().user).toEqual(
      userReducer({ isContributor: false, ifVoted: false }, {})
    );
    expect(store.getState().contributors).toEqual(contribReducer({}, {}));
  });
});
