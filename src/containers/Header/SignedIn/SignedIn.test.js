import React from 'react';
import { shallow } from 'enzyme';
import { SignedIn, mapStateToProps } from './SignedIn';

describe('SignedIn', () => {
  let signedIn;
  let mockProps;

  beforeEach(() => {
    mockProps = {
      displayName: 'Chase',
      isContributor: false,
      logOut: jest.fn()
    };
    signedIn = shallow(<SignedIn {...mockProps} />);
  });

  it('matches snapshot', () => {
    expect(signedIn).toMatchSnapshot();
  });

  it('matches snapshot with isContributor = true', () => {
    mockProps.isContributor = true;
    signedIn = shallow(<SignedIn {...mockProps} />);

    expect(signedIn).toMatchSnapshot();
  });

  it('calls props.logOut on click', () => {
    signedIn.find('.sign-out-btn').simulate('click');

    expect(mockProps.logOut).toHaveBeenCalledTimes(1);
  });

  describe('mapStateToProps', () => {
    it('maps state properties to props', () => {
      const mockState = {
        user: {
          displayName: 'Chase',
          isContributor: false
        }
      };
      const expected = {
        displayName: 'Chase',
        isContributor: false
      };
      const mappedProps = mapStateToProps(mockState);

      expect(mappedProps).toEqual(expected);
    });
  });
});
