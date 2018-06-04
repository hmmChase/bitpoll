import React, { Component } from 'react';
import { connect } from 'react-redux';
import { auth, provider } from '../../utils/firebase';
import fontawesome from '@fortawesome/fontawesome';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faGithub from '@fortawesome/fontawesome-free-brands';
import faCheck from '@fortawesome/fontawesome-free-regular';
import * as actions from '../../actions/index';
import './Header.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

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

  authGitHub = () => {
    return auth.signInWithPopup(provider).then(result => {
      return result.user;
    });
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

  logOut = () => {
    auth.signOut().then(() => {
      this.props.storeLogOut();
    });
  };

  render() {
    return (
      <header>
        <div>
          <h1 className="App-title">
            <FontAwesomeIcon
              className="logo-icon"
              icon={['far', 'check-circle']}
            />
            Bitpoll
          </h1>
        </div>

        {this.props.userId ? (
          <div className="signed-in-state">
            <div className="log-in-out">
              <p className="welcome-text">Welcome {this.props.displayName}</p>
              {this.props.isContributor && (
                <p className="verifed-text">
                  <FontAwesomeIcon icon={['far', 'check-circle']} />verified
                  contributor
                </p>
              )}
            </div>

            <div className="sign-out-btn" onClick={this.logOut}>
              <span>Log out</span>
            </div>
          </div>
        ) : (
          <div className="sign-in-btn" onClick={this.login}>
            <FontAwesomeIcon icon={['fab', 'github']} />
            <span className="sign-in-btn-txt">Sign in with GitHub</span>
          </div>
        )}
      </header>
    );
  }
}

export const mapStateToProps = state => ({
  displayName: state.user.displayName,
  userId: state.user.userId,
  isContributor: state.user.isContributor,
  contributors: state.contributors
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

export default connect(mapStateToProps, mapDispatchToProps)(App);
