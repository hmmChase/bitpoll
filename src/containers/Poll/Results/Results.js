import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Bar } from '@vx/shape';
import { Group } from '@vx/group';
import { GradientLightgreenGreen } from '@vx/gradient';
import { AxisBottom } from '@vx/axis';
import { scaleBand, scaleLinear } from '@vx/scale';
import './Results.css';

export const Results = props => {
  const data = [
    {
      option: 'Yes',
      tally: props.option1Tally
    },
    {
      option: 'No',
      tally: props.option2Tally
    }
  ];
  const width = 200;
  const height = 100;
  const margin = { top: 20, bottom: 20, left: 20, right: 20 };
  const xAxis = data => data.option;
  const yAxis = data => +data.tally;
  const xMax = width - margin.left - margin.right;
  const yMax = height - margin.top - margin.bottom;
  const xScale = scaleBand({
    rangeRound: [0, xMax],
    domain: data.map(xAxis),
    padding: 0.4
  });
  const yScale = scaleLinear({
    rangeRound: [yMax, 0],
    domain: [0, Math.max(...data.map(yAxis))]
  });
  const compose = (scale, accessor) => data => scale(accessor(data));
  const xPoint = compose(xScale, xAxis);
  const yPoint = compose(yScale, yAxis);

  return (
    <div>
      <svg className="chart" width={width} height={height}>
        {data.map((datum, index) => {
          const barHeight = yMax - yPoint(datum);
          return (
            <Group key={`bar-${index}`}>
              <GradientLightgreenGreen id="LightgreenGreen" />
              <AxisBottom scale={xScale} top={yMax} stroke={''} />

              <Bar
                x={xPoint(datum)}
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
        <span className="tally-left">{props.option1Tally}</span>
        <span>{props.option2Tally}</span>
      </div>
    </div>
  );
};
export const mapStateToProps = state => ({
  option1Tally: state.poll.option1Tally,
  option2Tally: state.poll.option2Tally
});

Results.propTypes = {
  option1Tally: PropTypes.number.isRequired,
  option2Tally: PropTypes.number.isRequired
};

export default connect(mapStateToProps)(Results);
