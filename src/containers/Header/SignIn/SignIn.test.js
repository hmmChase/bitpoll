import React from 'react';
import { shallow } from 'enzyme';
import SignIn from './SignIn';

describe('SignIn', () => {
  let signIn;
  let mockProps;

  beforeEach(() => {
    mockProps = {
      login: jest.fn()
    };
    signIn = shallow(<SignIn {...mockProps} />);
  });

  it('matches snapshot', () => {
    expect(signIn).toMatchSnapshot();
  });

  it('calls props.login on click', () => {
    signIn.find('.sign-in-btn').simulate('click');

    expect(mockProps.login).toHaveBeenCalledTimes(1);
  });
});
