import { put, call, select, takeLatest } from 'redux-saga/effects';
import * as actions from '../actions';

export const stateContributors = state => state.contributors;
export const stateUserId = state => state.user.userId;

export function* determineContributor() {
  const contributors = yield select(stateContributors);
  const userId = yield select(stateUserId);
  const contribIds = yield Object.keys(contributors);
  let isContributor = yield contribIds.includes(userId.toString());

  isContributor = true;

  yield put(actions.storeIsContributor(isContributor));
}
