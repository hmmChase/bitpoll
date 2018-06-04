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
