import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../actions';
import './Options.css';

export class Options extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: ''
    };
  }

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      value
    });
    this.props.storeSelectedOption(name);
    this.props.storeOptionValue(value);
    this.props.storeVoteBtnDisabled(false);
  };

  render() {
    return (
      <div>
        <ul>
          <li>
            <input
              className="option1"
              id="option1"
              name="option1"
              type="radio"
              value="yes"
              checked={this.state.value === 'yes'}
              onChange={this.handleChange}
            />
            <div className="check" />
            <label htmlFor="option1">Yes</label>
          </li>
          <li>
            <input
              id="option2"
              name="option2"
              type="radio"
              value="no"
              checked={this.state.value === 'no'}
              onChange={this.handleChange}
            />
            <div className="check" />
            <label htmlFor="option2">No</label>
          </li>
        </ul>
      </div>
    );
  }
}

export const mapDispatchToProps = dispatch => ({
  storeSelectedOption: option => dispatch(actions.storeSelectedOption(option)),
  storeOptionValue: value => dispatch(actions.storeOptionValue(value)),
  storeVoteBtnDisabled: boolean =>
    dispatch(actions.storeVoteBtnDisabled(boolean))
});

export default connect(
  null,
  mapDispatchToProps
)(Options);
