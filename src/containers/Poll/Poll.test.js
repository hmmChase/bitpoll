import React from 'react';
import { shallow } from 'enzyme';
import { Poll, mapStateToProps, mapDispatchToProps } from './Poll';
import * as actions from '../../actions';

describe('Poll', () => {
  let poll;
  let mockProps;

  beforeEach(() => {
    jest.resetAllMocks();
    mockProps = {
      userId: '',
      isContributor: false,
      ifVoted: false,
      selectedOption: 'option1',
      value: 'yes',
      voteBtnDisabled: false,
      storeIfVoted: jest.fn(),
      storeOption1Tally: jest.fn(),
      storeOption2Tally: jest.fn()
    };
    poll = shallow(<Poll {...mockProps} />, { disableLifecycleMethods: true });
  });

  it('matches snapshot with no user logged in', () => {
    expect(poll).toMatchSnapshot();
  });

  it('matches snapshot with user logged in and not voted', () => {
    mockProps.userId = '23432';
    poll = shallow(<Poll {...mockProps} />, { disableLifecycleMethods: true });

    expect(poll).toMatchSnapshot();
  });

  it('matches snapshot with user logged in and contributor', () => {
    mockProps.userId = '23432';
    mockProps.isContributor = true;
    poll = shallow(<Poll {...mockProps} />, { disableLifecycleMethods: true });

    expect(poll).toMatchSnapshot();
  });

  it('matches snapshot with user logged in and voted', () => {
    mockProps.userId = '23432';
    mockProps.isContributor = true;
    mockProps.ifVoted = true;
    poll = shallow(<Poll {...mockProps} />, { disableLifecycleMethods: true });

    expect(poll).toMatchSnapshot();
  });

  describe('componentDidMount', () => {
    it('calls syncDB', () => {
      const syncDB = (poll.instance().syncDB = jest.fn());
      poll.instance().componentDidMount();

      expect(syncDB).toHaveBeenCalledTimes(1);
    });
  });

  describe('ifVoted', () => {
    it('calls props.storeIfVoted with correct params', () => {
      const voterIDs = ['432532'];
      poll.instance().ifVoted(voterIDs);

      expect(mockProps.storeIfVoted).toHaveBeenCalledTimes(1);
      expect(mockProps.storeIfVoted).toHaveBeenCalledWith(false);
    });
  });

  describe('handleSubmit', () => {
    it('calls increment', () => {
      const mockEvent = { preventDefault: jest.fn() };
      const increment = (poll.instance().increment = jest.fn());
      poll.instance().handleSubmit(mockEvent);

      expect(increment).toHaveBeenCalledTimes(1);
    });
  });

  describe('increment', () => {
    it('calls updateResult with correct params', () => {
      poll.setState({ option1: 23 });
      const updateResult = (poll.instance().updateResult = jest.fn());
      poll.instance().increment();

      expect(updateResult).toHaveBeenCalledTimes(1);
      expect(updateResult).toHaveBeenCalledWith(24);
    });
  });

  describe('updateResult', () => {
    it('sets state of selected option with value', () => {
      const incrementOption = 24;
      poll.instance().updateResult(incrementOption);

      expect(poll.state().option1).toEqual(24);
    });

    it('calls updateDB with correct params', () => {
      const incrementOption = 24;
      const updateDB = (poll.instance().updateDB = jest.fn());
      poll.instance().updateResult(incrementOption);

      expect(updateDB).toHaveBeenCalledTimes(1);
      expect(updateDB).toHaveBeenCalledWith(24);
    });
  });

  describe('mapStateToProps', () => {
    it('should map state properties to props', () => {
      const mockState = {
        user: {
          userId: '3425435',
          isContributor: false,
          ifVoted: false
        },
        poll: {
          selectedOption: 'option1',
          value: 'yes',
          voteBtnDisabled: false
        }
      };
      const expected = {
        userId: '3425435',
        isContributor: false,
        ifVoted: false,
        selectedOption: 'option1',
        value: 'yes',
        voteBtnDisabled: false
      };
      const mappedProps = mapStateToProps(mockState);

      expect(mappedProps).toEqual(expected);
    });
  });

  describe('mapDispatchToProps', () => {
    it('calls dispatch on storeIfVoted', () => {
      const mockDispatch = jest.fn();
      const mappedProps = mapDispatchToProps(mockDispatch);
      const mockAction = actions.storeIfVoted();
      mappedProps.storeIfVoted();

      expect(mockDispatch).toHaveBeenCalledWith(mockAction);
    });

    it('calls dispatch on storeOption1Tally', () => {
      const mockDispatch = jest.fn();
      const mappedProps = mapDispatchToProps(mockDispatch);
      const mockAction = actions.storeOption1Tally();
      mappedProps.storeOption1Tally();

      expect(mockDispatch).toHaveBeenCalledWith(mockAction);
    });

    it('calls dispatch on storeOption2Tally', () => {
      const mockDispatch = jest.fn();
      const mappedProps = mapDispatchToProps(mockDispatch);
      const mockAction = actions.storeOption2Tally();
      mappedProps.storeOption2Tally();

      expect(mockDispatch).toHaveBeenCalledWith(mockAction);
    });
  });
});
