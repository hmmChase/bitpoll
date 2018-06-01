export const logIn = user => ({
  type: 'LOG_IN',
  user
});

export const logOut = () => ({
  type: 'LOG_OUT'
});

export const storeContributors = contributors => ({
  type: 'STORE_CONTRIBUTORS',
  contributors
});

export const getContributors = url => ({
  type: 'GET_CONTRIBUTORS',
  url
});
