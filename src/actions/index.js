export const logIn = user => ({
  type: 'LOG_IN',
  user
});

export const logOut = () => {
  console.log('logoutaction');

  return {
    type: 'LOG_OUT'
  };
};
