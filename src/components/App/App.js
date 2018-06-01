import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/index';
import Header from '../Header/Header';
import Poll from '../Poll/Poll';
import './App.css';

export class App extends Component {
  componentDidMount = () => {};

  render() {
    return (
      <div className="App">
        <Header />
        <button onClick={this.props.getContributors}>Fetch contributors</button>
        <main>
          <Poll />
        </main>
      </div>
    );
  }
}

export const mapDispatchToProps = dispatch => ({
  getContributors: () =>
    dispatch(
      actions.getContributors(
        'https://api.github.com/repos/bitcoin/bitcoin/contributors?per_page=100'
      )
    )
});

export default connect(null, mapDispatchToProps)(App);

