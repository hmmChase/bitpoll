import React, { Component } from 'react';
import { connect } from 'react-redux';
import firebase from '../../utils/firebase';
import * as actions from '../../actions';
import Options from './Options/Options';
import Results from './Results/Results';
import './Poll.css';

export class Poll extends Component {
  constructor(props) {
    super(props);

    this.state = {
      option1: 0,
      option2: 0
    };
  }

  componentDidMount = () => {
    this.syncDB();
  };

  ifVoted = voterIDs => {
    const hasVoted = voterIDs.includes(this.props.userId);
    this.props.storeIfVoted(hasVoted);
  };

  syncDB = () => {
    const pollRef = firebase
      .database()
      .ref()
      .child('poll');
    const option1Ref = pollRef.child('option1');
    const option2Ref = pollRef.child('option2');
    const voterIDsRef = pollRef.child('voterIDs');
    option1Ref.on('value', snapshot => {
      const option1RefVal = snapshot.val();
      this.props.storeOption1Tally(option1RefVal);
      this.setState({
        option1: option1RefVal
      });
    });
    option2Ref.on('value', snapshot => {
      const option2RefVal = snapshot.val();
      this.props.storeOption2Tally(option2RefVal);
      this.setState({
        option2: option2RefVal
      });
    });
    voterIDsRef.on('value', snapshot => {
      const voterIDsRef = snapshot.val();
      const voterIDs = voterIDsRef ? [this.state.voterIDs, ...voterIDsRef] : [];
      this.ifVoted(voterIDs);
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.increment();
  };

  increment = () => {
    let optionValue = this.state[this.props.selectedOption];
    const incrementOption = optionValue + 1;
    this.updateResult(incrementOption);
  };

  updateResult = incrementOption => {
    this.setState({
      [this.props.selectedOption]: incrementOption
    });
    this.updateDB(incrementOption);
  };

  updateDB = incrementOption => {
    const pollRef = firebase
      .database()
      .ref()
      .child('poll');
    pollRef.update({
      [this.props.selectedOption]: incrementOption,
      voterIDs: [this.props.userId]
    });
  };

  voteButton = () => (
    <button
      className="submit-btn"
      type="submit"
      disabled={this.props.voteBtnDisabled}
    >
      Vote
    </button>
  );

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h3 className="poll-title">Should the blocksize be increased?</h3>
        {this.props.userId && this.props.ifVoted ? (
          <div>
            <Results />
            <p className="thanks">Thanks for voting!</p>
          </div>
        ) : this.props.userId && this.props.isContributor ? (
          <div>
            <Options />
            <div>{this.voteButton()}</div>
          </div>
        ) : (
          <p className="vote-warning-text">
            You must be signed in and have contributed to the Bitcoin repo in
            order to vote.
          </p>
        )}
      </form>
    );
  }
}

export const mapStateToProps = state => ({
  userId: state.user.userId,
  isContributor: state.user.isContributor,
  ifVoted: state.user.ifVoted,
  selectedOption: state.poll.selectedOption,
  value: state.poll.value,
  voteBtnDisabled: state.poll.voteBtnDisabled
});

export const mapDispatchToProps = dispatch => ({
  storeIfVoted: hasVoted => dispatch(actions.storeIfVoted(hasVoted)),
  storeOption1Tally: tally => dispatch(actions.storeOption1Tally(tally)),
  storeOption2Tally: tally => dispatch(actions.storeOption2Tally(tally))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Poll);
