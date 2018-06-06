import React, { Component } from 'react';
import { connect } from 'react-redux';
import { auth, provider } from '../../utils/firebase';
import SignIn from './SignIn/SignIn';
import SignedIn from './SignedIn/SignedIn';
import fontawesome from '@fortawesome/fontawesome';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faGithub from '@fortawesome/fontawesome-free-brands';
import faCheck from '@fortawesome/fontawesome-free-regular';
import * as actions from '../../actions/index';
import './Header.css';

export class Header extends Component {
  componentDidMount() {
    this.refreshLogin();
  }

  refreshLogin = () => {
    auth.onAuthStateChanged(user => {
      if (user) {
        this.setLogin(user);
      }
    });
  };

  login = async () => {
    const user = await this.authGitHub();
    this.setLogin(user);
  };

  authGitHub = async () => {
    const result = await auth.signInWithPopup(provider);
    return result.user;
  };

  setLogin = user => {
    const cleanUser = this.cleanUser(user);
    this.props.storeUser(cleanUser);
    this.props.getContributors();
  };

  cleanUser = user => ({
    userId: user.providerData[0].uid,
    displayName: user.providerData[0].displayName
  });

  logOut = async () => {
    await auth.signOut();
    this.props.storeLogOut();
  };

  render() {
    return (
      <header>
        <h1 className="Header-title">
          <FontAwesomeIcon
            className="logo-icon"
            icon={['far', 'check-circle']}
          />
          Bitpoll
        </h1>
        {this.props.userId ? (
          <SignedIn logOut={this.logOut} />
        ) : (
          <SignIn login={this.login} />
        )}
      </header>
    );
  }
}

export const mapStateToProps = state => ({
  userId: state.user.userId
});

export const mapDispatchToProps = dispatch => ({
  storeUser: user => dispatch(actions.storeUser(user)),
  storeLogOut: () => dispatch(actions.storeLogOut()),
  getContributors: () =>
    dispatch(
      actions.getContributors(
        'https://api.github.com/repos/bitcoin/bitcoin/contributors?per_page=100'
      )
    )
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
