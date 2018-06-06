import React from 'react';
import { shallow } from 'enzyme';
import Poll from './Poll';

describe('Poll', () => {
  let poll;

  beforeEach(() => {
    poll = shallow(<Poll />);
  });

  it('matches the snapshot', () => {
    expect(poll).toMatchSnapshot();
  });
});
