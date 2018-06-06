import * as sagas from './determineContributor';
import { put, call, select, takeLatest } from 'redux-saga/effects';

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

  it.skip('yields select(stateContributors)', () => {
    const mockStateContributors = { 1111: { name: 'chase' } };

    const value = iterator.next().value;
    const expected = select(mockStateContributors);

    expect(value).toEqual(expected);
  });
});
