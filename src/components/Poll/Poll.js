import React, { Component } from 'react';
import firebase from '../../utils/firebase';

import './Poll.css';

class Poll extends Component {
  constructor(props) {
    super(props);

    this.state = {
      option1: 0,
      option2: 0,
      selected: null,
      value: null,
      disabled: true,
      voted: false
    };
  }

  componentDidMount = () => {
    this.watchChanges();
  };

  watchChanges = () => {
    // get refs
    const pollRef = firebase
      .database()
      .ref()
      .child('poll');
    const option1Ref = pollRef.child('option1');
    const option2Ref = pollRef.child('option2');

    // sync changes
    option1Ref.on('value', snapshot => {
      let option1RefVal = snapshot.val();

      this.setState({
        option1: option1RefVal
      });
    });

    option2Ref.on('value', snapshot => {
      let option2RefVal = snapshot.val();

      this.setState({
        option2: option2RefVal
      });
    });
  };

  handleChange = event => {
    const { name, value } = event.target;

    this.setState({
      selected: name,
      value,
      disabled: false
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.increment();
  };

  increment = () => {
    let optionValue = this.state[this.state.selected];
    const incrementOption = optionValue + 1;
    this.updateResult(incrementOption);
  };

  updateResult = incrementOption => {
    this.setState({
      [this.state.selected]: incrementOption
    });
    this.updateDB(incrementOption);
  };

  updateDB = incrementOption => {
    const pollRef = firebase
      .database()
      .ref()
      .child('poll');

    pollRef.update({
      [this.state.selected]: incrementOption
    });
  };

  displayResults = () => {};

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h3>Should the blocksize be increased?</h3>
        <ul>
          <li>
            <input
              className="option"
              id="option1"
              name="option1"
              type="radio"
              value="yes"
              checked={this.state.value === 'yes'}
              onChange={this.handleChange}
            />
            <label htmlFor="option1">Yes</label>
          </li>
          <li>
            <input
              className="option"
              id="option2"
              name="option2"
              type="radio"
              value="no"
              checked={this.state.value === 'no'}
              onChange={this.handleChange}
            />
            <label htmlFor="option2">No</label>
          </li>
        </ul>
        <button
          className="submit-btn"
          type="submit"
          disabled={this.state.disabled}
        >
          Vote
        </button>
      </form>
    );
  }
}

export default Poll;
