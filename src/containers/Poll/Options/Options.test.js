import React from 'react';
import { shallow } from 'enzyme';
import { Options, mapDispatchToProps } from './Options';
import * as actions from '../../../actions';

describe('Options', () => {
  let options;
  let mockProps;

  beforeEach(() => {
    mockProps = {
      storeSelectedOption: jest.fn(),
      storeOptionValue: jest.fn(),
      storeVoteBtnDisabled: jest.fn()
    };
    options = shallow(<Options {...mockProps} />);
  });

  it('matches snapshot', () => {
    expect(options).toMatchSnapshot();
  });

  it.skip('calls handleChange onChange', () => {
    const mockEvent = { target: { name: 'option1', value: 'yes' } };
    const handleChange = (options.instance().handleChange = jest.fn());
    options.find('.option1').simulate('change', mockEvent);

    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  describe('handleChange', () => {
    it('sets state.value on check of radio button', () => {
      const mockEvent = {
        target: {
          name: 'option1',
          value: 'yes'
        }
      };
      options.instance().handleChange(mockEvent);

      expect(options.state()).toEqual({
        value: 'yes'
      });
    });

    it('calls storeSelectedOption with correct params', () => {
      const mockEvent = {
        target: {
          name: 'option1',
          value: 'yes'
        }
      };
      options.instance().handleChange(mockEvent);

      expect(mockProps.storeSelectedOption).toHaveBeenCalledTimes(1);
      expect(mockProps.storeSelectedOption).toHaveBeenCalledWith('option1');
    });

    it('calls storeOptionValue with correct params', () => {
      const mockEvent = {
        target: {
          name: 'option1',
          value: 'yes'
        }
      };
      options.instance().handleChange(mockEvent);

      expect(mockProps.storeOptionValue).toHaveBeenCalledTimes(1);
      expect(mockProps.storeOptionValue).toHaveBeenCalledWith('yes');
    });

    it('calls storeVoteBtnDisabled with correct params', () => {
      const mockEvent = {
        target: {
          name: 'option1',
          value: 'yes'
        }
      };
      options.instance().handleChange(mockEvent);

      expect(mockProps.storeVoteBtnDisabled).toHaveBeenCalledTimes(1);
      expect(mockProps.storeVoteBtnDisabled).toHaveBeenCalledWith(false);
    });
  });

  describe('mapDispatchToProps', () => {
    it('calls dispatch on storeSelectedOption', () => {
      const mockDispatch = jest.fn();
      const mappedProps = mapDispatchToProps(mockDispatch);
      const mockAction = actions.storeSelectedOption();
      mappedProps.storeSelectedOption();

      expect(mockDispatch).toHaveBeenCalledWith(mockAction);
    });

    it('calls dispatch on storeOptionValue', () => {
      const mockDispatch = jest.fn();
      const mappedProps = mapDispatchToProps(mockDispatch);
      const mockAction = actions.storeOptionValue();
      mappedProps.storeOptionValue();

      expect(mockDispatch).toHaveBeenCalledWith(mockAction);
    });

    it('calls dispatch on storeVoteBtnDisabled', () => {
      const mockDispatch = jest.fn();
      const mappedProps = mapDispatchToProps(mockDispatch);
      const mockAction = actions.storeVoteBtnDisabled();
      mappedProps.storeVoteBtnDisabled();

      expect(mockDispatch).toHaveBeenCalledWith(mockAction);
    });
  });
});
