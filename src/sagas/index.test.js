import * as sagas from './index';
import * as actions from '../actions';
import { put, call, select, takeLatest } from 'redux-saga/effects';
import { doFetch, cleanContributors, parseLinkHeader } from '../api';
jest.mock('../api');

describe('sagas', () => {
  describe('listenForGetContributors', () => {
    let iterator;

    beforeAll(() => {
      iterator = sagas.listenForGetContributors();
    });

    it('yields takeLatest with the correct params', () => {
      const value = iterator.next().value;
      const expected = takeLatest('GET_CONTRIBUTORS', sagas.fetchContributors);
      expect(value).toEqual(expected);
    });

    it('is done', () => {
      const done = iterator.next().done;
      expect(done).toBe(true);
    });
  });

  describe('submitUserLogin happy path', () => {
    let iterator;
    let mockAction;

    beforeAll(() => {
      mockAction = {
        type: 'GET_CONTRIBUTORS',
        url: 'localhost:3000/api'
      };

      iterator = sagas.fetchContributors(mockAction);
    });

    it('yields doFetch with correct params', () => {
      const value = iterator.next().value;
      const expected = call(doFetch, mockAction.url);

      expect(value).toEqual(expected);
    });

    it('yields response.json()', () => {
      const response = { json: jest.fn() };

      const value = iterator.next(response).value;
      const expected = response.json();

      expect(value).toEqual(expected);
    });

    it('yields call(cleanContributors, contributors)', () => {
      const mockContributors = { 1111: { name: 'chase' } };

      const value = iterator.next(mockContributors).value;
      const expected = call(cleanContributors, mockContributors);

      expect(value).toEqual(expected);
    });

    it('yields put(actions.storeContributors(cleanedContributors))', () => {
      const mockCleanedContributors = { 1111: { name: 'chase' } };

      const value = iterator.next(mockCleanedContributors).value;
      const expected = put(actions.storeContributors(mockCleanedContributors));

      expect(value).toEqual(expected);
    });

    // it('yields response.headers.get("Link")', () => {
    //   const response = { headers: { get: jest.fn(() => 'Link') } };

    //   const value = iterator.next(response).value;
    //   console.log('value: ', value);

    //   const expected = response.headers.get('Link');

    //   expect(value).toEqual(expected);
    // });

    // it('yields parseLinkHeader(links)', () => {
    //   const links = { 1111: { name: 'chase' } };

    //   const value = iterator.next().value;
    //   const expected = parseLinkHeader(links);

    //   expect(value).toEqual(expected);
    // });
  });

  describe('stateContributors', () => {
    it('returns contributors', () => {
      const mockState = { contributors: { 1234: { name: 'chase' } } };
      const expected = { 1234: { name: 'chase' } };

      expect(sagas.stateContributors(mockState)).toEqual(expected);
    });
  });

  describe('stateUserId', () => {
    it('returns userId', () => {
      const mockState = { user: { userId: 123 } };
      const expected = 123;

      expect(sagas.stateUserId(mockState)).toEqual(expected);
    });
  });

  describe('determineContributor', () => {
    let iterator;

    beforeAll(() => {
      iterator = sagas.determineContributor();
    });

    it('yields select(stateContributors)', () => {
      const mockStateContributors = { 1111: { name: 'chase' } };

      const value = iterator.next().value;
      const expected = select(mockStateContributors);

      expect(value).toEqual(expected);
    });
  });
});
