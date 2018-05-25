import React, { Component } from 'react';
import { connect } from 'react-redux';
import firebase, { auth, provider } from '../../utils/firebase';
import * as actions from '../../actions/index';
import './App.css';

export class App extends Component {
  componentDidMount() {
    // auth.onAuthStateChanged(user => {
    //   const cleanUser = {
    //     userId: user.providerData[0].uid,
    //     displayName: user.providerData[0].displayName
    //     // displayName: 'Chase',
    //     // userId: 10532835
    //   };
    //   this.props.logIn(cleanUser);
    //   // if (user) {
    //   //   this.setState({ user });
    //   // }
    // });
  }

  login = () => {
    // auth.signInWithPopup(provider).then(result => {
    //   const user = result.user;
    //   console.log(user);
    const cleanUser = {
      // userId: user.providerData[0].uid,
      // displayName: user.providerData[0].displayName
      displayName: 'Chase',
      userId: 10532835
    };
    this.props.logIn(cleanUser);
    // });
  };

  logout = () => {
    // auth.signOut().then(() => {
    // this.setState({
    //   // user: null
    //   displayName: '',
    //   userId: ''
    // });
    // });
    this.props.logOut();
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          {this.props.userId ? (
            <div>
              <button onClick={this.logout}>Log Out</button>
              <h3>Welcome, {this.props.displayName}</h3>
            </div>
          ) : (
            <button onClick={this.login}>Log In</button>
          )}
          <h1 className="App-title">Bitpoll</h1>
        </header>
        <p className="App-intro">Poll</p>
      </div>
    );
  }
}

export const mapStateToProps = state => ({
  displayName: state.user.displayName,
  userId: state.user.userId
});

export const mapDispatchToProps = dispatch => ({
  logIn: user => dispatch(actions.logIn(user)),
  logOut: () => dispatch(actions.logOut())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
