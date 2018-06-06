import React from 'react';
import { shallow } from 'enzyme';
import { Header } from './Header';
import firebase, { auth, provider } from '../../utils/firebase';
jest.mock('../../utils/firebase.js');

describe('Header', () => {
  let header;
  let mockProps;

  beforeEach(() => {
    jest.resetAllMocks();
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

  it('matches snapshot with userId set', () => {
    expect(header).toMatchSnapshot();
  });

  it('matches snapshot with no userId set', () => {
    mockProps.userId = '';
    header = shallow(<Header {...mockProps} />);

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

    it.skip('calls setLogin', () => {
      const setLogin = (header.instance().setLogin = jest.fn());
      header.instance().refreshLogin();

      expect(setLogin).toHaveBeenCalledTimes(1);
    });
  });

  describe('login', () => {
    it('calls authGitHub', async () => {
      const authGitHub = (header.instance().authGitHub = jest.fn());
      const setLogin = (header.instance().setLogin = jest.fn());
      await header.instance().login();

      expect(authGitHub).toHaveBeenCalledTimes(1);
    });

    it('calls setLogin with correct params', async () => {
      const mockUser = { id: 111 };
      const authGitHub = (header.instance().authGitHub = jest.fn());
      authGitHub.mockImplementation(() => Promise.resolve(mockUser));
      const setLogin = (header.instance().setLogin = jest.fn());
      await header.instance().login();

      expect(setLogin).toHaveBeenCalledTimes(1);
      expect(setLogin).toHaveBeenCalledWith(mockUser);
    });
  });

  describe('authGitHub', () => {
    it('calls auth.signInWithPopup', async () => {
      const mockUser = { id: 111 };
      auth.signInWithPopup.mockImplementation(() => Promise.resolve(mockUser));
      await header.instance().authGitHub();

      expect(auth.signInWithPopup).toHaveBeenCalledTimes(1);
      expect(auth.signInWithPopup).toHaveBeenCalledWith(provider);
    });

    it.skip('returns a user object', async () => {
      const mockUser = { id: 111 };
      await auth.signInWithPopup.mockImplementation(() =>
        Promise.resolve(mockUser)
      );
      const authGitHub = header.instance().authGitHub();

      await expect(authGitHub).resolves.toEqual(mockUser);
    });
  });

  describe('setLogin', () => {
    it('calls cleanUser with correct params', () => {
      const mockUser = { id: 111 };
      const cleanUser = (header.instance().cleanUser = jest.fn());
      header.instance().setLogin(mockUser);

      expect(cleanUser).toHaveBeenCalledTimes(1);
      expect(cleanUser).toHaveBeenCalledWith(mockUser);
    });

    it('calls storeUser with correct params', () => {
      const mockCleanUser = { id: 111 };
      const cleanUser = (header.instance().cleanUser = jest.fn());
      cleanUser.mockImplementation(() => mockCleanUser);
      header.instance().setLogin();

      expect(mockProps.storeUser).toHaveBeenCalledTimes(1);
      expect(mockProps.storeUser).toHaveBeenCalledWith(mockCleanUser);
    });

    it('calls getContributors', () => {
      const cleanUser = (header.instance().cleanUser = jest.fn());
      header.instance().setLogin();

      expect(mockProps.getContributors).toHaveBeenCalledTimes(1);
    });
  });

  describe('cleanUser', () => {
    it('returns a cleaned user object', () => {
      const mockUser = {
        providerData: [
          { uid: 111, displayName: 'Chase', somethingElse: 'mock property' }
        ]
      };
      const expected = {
        displayName: 'Chase',
        userId: 111
      };
      const cleanUser = header.instance().cleanUser(mockUser);

      expect(cleanUser).toEqual(expected);
    });
  });

  describe('logOut', () => {
    it('calls auth.signOut', async () => {
      await header.instance().logOut();

      expect(auth.signOut).toHaveBeenCalledTimes(1);
    });

    it('calls props.storeLogOutt', async () => {
      await header.instance().logOut();

      expect(mockProps.storeLogOut).toHaveBeenCalledTimes(1);
    });
  });
});
