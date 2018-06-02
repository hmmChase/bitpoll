import React, { Component } from 'react';
import { connect } from 'react-redux';
import firebase, { auth, provider } from '../../utils/firebase';
import fontawesome from '@fortawesome/fontawesome';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import brands from '@fortawesome/fontawesome-free-brands';
import faGithub from '@fortawesome/fontawesome-free-brands/faGithub';
import * as actions from '../../actions/index';
import './Header.css';

fontawesome.library.add(faGithub);

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
    // console.log('contrbs: ', this.props.contributors);

    this.determineContributor();
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

  determineContributor = async () => {
    // console.log('userId', this.props.userId);
    // await console.log('contributors', this.props.contributors);
  };

  render() {
    return (
      <header>
        <h1 className="App-title">Bitpoll</h1>
        {this.props.userId ? (
          <div className="signed-in-state">
            <span className="welcome-text">
              Welcome {this.props.displayName}
            </span>

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
    ),
  determineContributor: () => dispatch(actions.determineContributor())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
