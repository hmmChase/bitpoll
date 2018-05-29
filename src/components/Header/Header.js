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
    // auth.onAuthStateChanged(async user => {
    //   if (user) {
    //     if (this.props.userId === undefined) {
    //       this.props.logIn(user);
    //     }
    //     console.log('cdm-before: ', this.props.contributors.length);
    //     if (this.props.contributors.length === 0) {
    //       this.fetchContributors(
    //         'https://api.github.com/repos/bitcoin/bitcoin/contributors?page=1&per_page=100'
    //       );
    //       console.log('cdm-after: ', this.props.contributors.length);
    //     }
    //   }
    // });
  }

  login = async () => {
    const user = await this.authGitHub();
    const cleanUser = {
      userId: user.providerData[0].uid,
      displayName: user.providerData[0].displayName
    };
    this.props.logIn(cleanUser);
    this.props.fetchContributors(
      'https://api.github.com/repos/bitcoin/bitcoin/contributors?per_page=100'
    );
  };

  logout = () => {
    auth.signOut().then(() => {
      this.props.logOut();
    });
  };

  authGitHub = () => {
    return auth.signInWithPopup(provider).then(result => {
      return result.user;
    });
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

            <div className="sign-out-btn" onClick={this.logout}>
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
  logIn: user => dispatch(actions.logIn(user)),
  logOut: () => dispatch(actions.logOut()),
  storeContributors: contributors =>
    dispatch(actions.storeContributors(contributors))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
