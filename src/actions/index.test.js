import {
  storeUser,
  storeLogOut,
  storeContributors,
  getContributors,
  storeIsContributor,
  storeIfVoted,
  storeSelectedOption,
  storeOptionValue,
  storeVoteBtnDisabled,
  storeOption1Tally,
  storeOption2Tally
} from './index';

describe('Actions', () => {
  describe('storeUser', () => {
    it('has a type of STORE_USER', () => {
      const user = {};

      const actual = storeUser(user);
      const expected = {
        type: 'STORE_USER',
        user
      };

      expect(actual).toEqual(expected);
    });
  });

  describe('storeLogOut', () => {
    it('has a type of STORE_LOG_OUT', () => {
      const actual = storeLogOut();
      const expected = {
        type: 'STORE_LOG_OUT'
      };

      expect(actual).toEqual(expected);
    });
  });

  describe('storeContributors', () => {
    it('has a type of STORE_CONTRIBUTORS', () => {
      const contributors = {};

      const actual = storeContributors(contributors);
      const expected = {
        type: 'STORE_CONTRIBUTORS',
        contributors
      };

      expect(actual).toEqual(expected);
    });
  });

  describe('getContributors', () => {
    it('has a type of GET_CONTRIBUTORS', () => {
      const url = 'localhost:3000/api';

      const actual = getContributors(url);
      const expected = {
        type: 'GET_CONTRIBUTORS',
        url
      };

      expect(actual).toEqual(expected);
    });
  });

  describe('storeIsContributor', () => {
    it('has a type of STORE_IS_CONTRIBUTOR', () => {
      const boolean = false;

      const actual = storeIsContributor(boolean);
      const expected = {
        type: 'STORE_IS_CONTRIBUTOR',
        boolean
      };

      expect(actual).toEqual(expected);
    });
  });

  describe('storeIfVoted', () => {
    it('has a type of STORE_IF_VOTED', () => {
      const boolean = false;

      const actual = storeIfVoted(boolean);
      const expected = {
        type: 'STORE_IF_VOTED',
        boolean
      };

      expect(actual).toEqual(expected);
    });
  });

  describe('storeSelectedOption', () => {
    it('has a type of STORE_SELECTED_OPTION', () => {
      const option = 'option1';

      const actual = storeSelectedOption(option);
      const expected = {
        type: 'STORE_SELECTED_OPTION',
        option
      };

      expect(actual).toEqual(expected);
    });
  });

  describe('storeOptionValue', () => {
    it('has a type of STORE_OPTION_VALUE', () => {
      const value = '12';

      const actual = storeOptionValue(value);
      const expected = {
        type: 'STORE_OPTION_VALUE',
        value
      };

      expect(actual).toEqual(expected);
    });
  });

  describe('storeVoteBtnDisabled', () => {
    it('has a type of STORE_VOTE_BTN_DISABLED', () => {
      const boolean = false;

      const actual = storeVoteBtnDisabled(boolean);
      const expected = {
        type: 'STORE_VOTE_BTN_DISABLED',
        boolean
      };

      expect(actual).toEqual(expected);
    });
  });

  describe('storeOption1Tally', () => {
    it('has a type of STORE_OPTION1_TALLY', () => {
      const tally = 32;

      const actual = storeOption1Tally(tally);
      const expected = {
        type: 'STORE_OPTION1_TALLY',
        tally
      };

      expect(actual).toEqual(expected);
    });
  });

  describe('storeOption2Tally', () => {
    it('has a type of STORE_OPTION2_TALLY', () => {
      const tally = 32;

      const actual = storeOption2Tally(tally);
      const expected = {
        type: 'STORE_OPTION2_TALLY',
        tally
      };

      expect(actual).toEqual(expected);
    });
  });
});
