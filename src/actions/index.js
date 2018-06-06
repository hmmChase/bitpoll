export const storeUser = user => ({
  type: 'STORE_USER',
  user
});

export const storeLogOut = () => ({
  type: 'STORE_LOG_OUT'
});

export const storeContributors = contributors => ({
  type: 'STORE_CONTRIBUTORS',
  contributors
});

export const getContributors = url => ({
  type: 'GET_CONTRIBUTORS',
  url
});

export const storeIsContributor = boolean => ({
  type: 'STORE_IS_CONTRIBUTOR',
  boolean
});

export const storeIfVoted = boolean => ({
  type: 'STORE_IF_VOTED',
  boolean
});

export const storeSelectedOption = option => ({
  type: 'STORE_SELECTED_OPTION',
  option
});

export const storeOptionValue = value => ({
  type: 'STORE_OPTION_VALUE',
  value
});

export const storeVoteBtnDisabled = boolean => ({
  type: 'STORE_VOTE_BTN_DISABLED',
  boolean
});

export const storeOption1Tally = tally => ({
  type: 'STORE_OPTION1_TALLY',
  tally
});

export const storeOption2Tally = tally => ({
  type: 'STORE_OPTION2_TALLY',
  tally
});
