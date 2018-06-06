import React from 'react';
import { shallow } from 'enzyme';
import { Header } from './Header';
import { auth, provider } from '../../utils/firebase';
jest.mock('../../utils/firebase.js');

describe('Header', () => {
  let header;
  let mockProps;

  beforeEach(() => {
    mockProps = {
      contributors: {},
      displayName: 'Chase',
      getContributors: jest.fn(),
      isContributor: false,
      storeLogOut: jest.fn(),
      storeUser: jest.fn(),
      userId: '10532835'
    };
    header = shallow(<Header {...mockProps} />, {
      disableLifecycleMethods: true
    });
  });

  it('matches the snapshot', () => {
    expect(header).toMatchSnapshot();
  });

  describe('componentDidMount', () => {
    it('calls refreshLogin', () => {
      const refreshLogin = (header.instance().refreshLogin = jest.fn());
      header.instance().componentDidMount();

      expect(refreshLogin).toHaveBeenCalledTimes(1);
    });
  });

  describe('refreshLogin', () => {
    it('calls auth.onAuthStateChanged', () => {
      header.instance().refreshLogin();

      expect(auth.onAuthStateChanged).toHaveBeenCalledTimes(1);
    });

    // it('calls setLogin', () => {
    //   const user = { id: 1111 };

    //   auth.onAuthStateChanged(user);

    //   const setLogin = (header.instance().setLogin = jest.fn());
    //   header.instance().refreshLogin();

    //   expect(setLogin).toHaveBeenCalledTimes(1);
    // });
  });

  describe('login', () => {
    it.only('calls authGitHub', async () => {
      console.log('asdf');

      const authGitHub = (header.instance().authGitHub = jest.fn());
      authGitHub.mockImplementation(() => Promise.resolve({}));

      console.log('hi');

      console.log('authGitHub: ', authGitHub);

      await header.instance().login();

      console.log('bye');

      console.log('authGitHub: ', authGitHub);

      await expect(await authGitHub).toHaveBeenCalledTimes(1);
    });
  });
});
