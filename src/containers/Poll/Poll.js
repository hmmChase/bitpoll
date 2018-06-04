import React, { Component } from 'react';
import { connect } from 'react-redux';
import firebase from '../../utils/firebase';
import * as actions from '../../actions';
import { Bar } from '@vx/shape';
import { Group } from '@vx/group';
import { GradientLightgreenGreen } from '@vx/gradient';
import { AxisBottom } from '@vx/axis';
import { scaleBand, scaleLinear } from '@vx/scale';

import './Poll.css';

class Poll extends Component {
  constructor(props) {
    super(props);

    this.state = {
      option1: 0,
      option2: 0,
      selected: null,
      value: null,
      disabled: true
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

      this.setState({
        option1: option1RefVal
      });
    });

    option2Ref.on('value', snapshot => {
      const option2RefVal = snapshot.val();

      this.setState({
        option2: option2RefVal
      });
    });

    voterIDsRef.on('value', snapshot => {
      const voterIDsRef = snapshot.val();
      const voterIDs = voterIDsRef ? [this.state.voterIDs, ...voterIDsRef] : '';

      this.ifVoted(voterIDs);
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
      [this.state.selected]: incrementOption,
      voted: true
    });
    this.updateDB(incrementOption);
  };

  updateDB = incrementOption => {
    const pollRef = firebase
      .database()
      .ref()
      .child('poll');

    pollRef.update({
      [this.state.selected]: incrementOption,
      voterIDs: [this.props.userId]
    });
  };

  displayResults = () => {
    const data = [
      {
        option: 'Yes',
        tally: this.state.option1
      },
      {
        option: 'No',
        tally: this.state.option2
      }
    ];

    const width = 200;
    const height = 100;
    const margin = { top: 20, bottom: 20, left: 20, right: 20 };

    const x = d => d.option;
    const y = d => +d.tally;

    const xMax = width - margin.left - margin.right;
    const yMax = height - margin.top - margin.bottom;

    // scales
    const xScale = scaleBand({
      rangeRound: [0, xMax],
      domain: data.map(x),
      padding: 0.4
    });
    const yScale = scaleLinear({
      rangeRound: [yMax, 0],
      domain: [0, Math.max(...data.map(y))]
    });

    // Compose together the scale and accessor functions to get point functions
    const compose = (scale, accessor) => data => scale(accessor(data));
    const xPoint = compose(xScale, x);
    const yPoint = compose(yScale, y);

    return (
      <div>
        <svg className="chart" width={width} height={height}>
          {data.map((d, i) => {
            const barHeight = yMax - yPoint(d);
            return (
              <Group key={`bar-${i}`}>
                <GradientLightgreenGreen id="LightgreenGreen" />
                {/* <AxisTop scale={yScale} top={yMax} stroke={''} /> */}
                <AxisBottom scale={xScale} top={yMax} stroke={''} />

                <Bar
                  x={xPoint(d)}
                  y={yMax - barHeight}
                  height={barHeight}
                  width={xScale.bandwidth()}
                  fill={`url(#LightgreenGreen)`}
                />
              </Group>
            );
          })}
        </svg>
        <div className="tally">
          <span className="tally-left">{this.state.option1}</span>
          <span>{this.state.option2}</span>
        </div>
      </div>
    );
  };

  voteOptions = () => (
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
        <div className="check" />
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
        <div className="check" />
        <label htmlFor="option2">No</label>
      </li>
    </ul>
  );

  voteButton = () => (
    <button className="submit-btn" type="submit" disabled={this.state.disabled}>
      Vote
    </button>
  );

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h3 className="poll-title">Should the blocksize be increased?</h3>
        {this.props.userId && this.props.ifVoted ? (
          <div>
            {this.displayResults()}
            <p className="thanks">Thanks for voting!</p>
          </div>
        ) : this.props.userId && this.props.isContributor ? (
          <div>
            <div>{this.voteOptions()}</div> <div>{this.voteButton()}</div>
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
  ifVoted: state.user.ifVoted
});

export const mapDispatchToProps = dispatch => ({
  storeIfVoted: hasVoted => dispatch(actions.storeIfVoted(hasVoted))
});

export default connect(mapStateToProps, mapDispatchToProps)(Poll);
