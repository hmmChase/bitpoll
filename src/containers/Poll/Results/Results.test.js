import React from 'react';
import { shallow } from 'enzyme';
import { Results } from './Results';

describe('Results', () => {
  let results;
  let mockProps;

  beforeEach(() => {
    mockProps = {
      option1Tally: 34,
      option2Tally: 65
    };
    results = shallow(<Results {...mockProps} />);
  });

  it('matches snapshot', () => {
    expect(results).toMatchSnapshot();
  });
});
