import React from 'react';
import { shallow } from 'enzyme';
import { Results, mapStateToProps } from './Results';

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

  describe('mapStateToProps', () => {
    it('should map state properties to props', () => {
      const mockState = {
        poll: {
          option1Tally: 23,
          option2Tally: 43
        }
      };
      const expected = {
        option1Tally: 23,
        option2Tally: 43
      };
      const mappedProps = mapStateToProps(mockState);

      expect(mappedProps).toEqual(expected);
    });
  });
});
