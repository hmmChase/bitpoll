import {
  storeUser,
  storeLogOut,
  storeContributors,
  getContributors,
  storeIsContributor,
  storeIfVoted
} from './index';

describe('Actions', () => {
  describe('storeUser', () => {
    it('has a type of STORE_USER', () => {
      let user = {};

      let actual = storeUser(user);
      let expected = {
        type: 'STORE_USER',
        user
      };

      expect(actual).toEqual(expected);
    });
  });

  describe('storeLogOut', () => {
    it('has a type of STORE_LOG_OUT', () => {
      let actual = storeLogOut();
      let expected = {
        type: 'STORE_LOG_OUT'
      };

      expect(actual).toEqual(expected);
    });
  });

  describe('storeContributors', () => {
    it('has a type of STORE_CONTRIBUTORS', () => {
      let contributors = {};

      let actual = storeContributors(contributors);
      let expected = {
        type: 'STORE_CONTRIBUTORS',
        contributors
      };

      expect(actual).toEqual(expected);
    });
  });

  describe('getContributors', () => {
    it('has a type of GET_CONTRIBUTORS', () => {
      let url = '';

      let actual = getContributors(url);
      let expected = {
        type: 'GET_CONTRIBUTORS',
        url
      };

      expect(actual).toEqual(expected);
    });
  });

  describe('storeIsContributor', () => {
    it('has a type of STORE_IS_CONTRIBUTOR', () => {
      let boolean = false;

      let actual = storeIsContributor(boolean);
      let expected = {
        type: 'STORE_IS_CONTRIBUTOR',
        boolean
      };

      expect(actual).toEqual(expected);
    });
  });

  describe('storeIfVoted', () => {
    it('has a type of STORE_IF_VOTED', () => {
      let boolean = false;

      let actual = storeIfVoted(boolean);
      let expected = {
        type: 'STORE_IF_VOTED',
        boolean
      };

      expect(actual).toEqual(expected);
    });
  });
});
