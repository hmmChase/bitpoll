import React, { Component } from 'react';
import { connect } from 'react-redux';
import firebase from '../../utils/firebase';
import * as actions from '../../actions/index';
import Header from '../Header/Header';
import Poll from '../Poll/Poll';
import { doFetch, parseLinkHeader } from '../../api';
import './App.css';

export class App extends Component {
  componentDidMount = () => {};

  // how to move to seperate file when need access to store
  fetchContributors = async url => {
    const response = await doFetch(url);
    const contributors = await response.json();

    const cleanedContributors = contributors.map(contributor => {
      return { [contributor.id]: { ...contributor } };
    });

    this.props.storeContributors(cleanedContributors);

    const links = await response.headers.get('Link');
    const parsedLinks = parseLinkHeader(links);
    let next = parsedLinks.next;

    if (next) {
      await this.fetchContributors(next);
    }
  };

  render() {
    return (
      <div className="App">
        <Header fetchContributors={this.fetchContributors} />
        <button
          onClick={() =>
            this.fetchContributors(
              'https://api.github.com/repos/bitcoin/bitcoin/contributors?per_page=100'
            )
          }
        >
          Fetch contributors
        </button>
        <main>
          <Poll />
        </main>
      </div>
    );
  }
}

export const mapStateToProps = state => ({
  contributors: state.contributors
});

export const mapDispatchToProps = dispatch => ({
  storeContributors: contributors =>
    dispatch(actions.storeContributors(contributors))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
