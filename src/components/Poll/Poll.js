import React, { Component } from 'react';
import './Poll.css';

class Poll extends Component {
  constructor(props) {
    super(props);

    this.state = {
      answer: null,
      disabled: true
    };
  }

  componentDidMount = () => {};

  handleChange = event => {
    this.setState({
      answer: event.target.value,
      disabled: false
    });
  };

  handleSubmit = event => {
    event.preventDefault();

    alert(this.state.answer);
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <p>Should the blocksize be increased?</p>

        <ul>
          <li>
            <input
              className="option"
              id="option1"
              type="radio"
              value="yes"
              checked={this.state.answer === 'yes'}
              onChange={this.handleChange}
            />
            <label htmlFor="option1">Yes</label>
          </li>

          <li>
            <input
              className="option"
              id="option2"
              type="radio"
              value="no"
              checked={this.state.answer === 'no'}
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
