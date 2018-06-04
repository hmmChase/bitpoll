import { put, select, takeLatest } from 'redux-saga/effects';
import * as API from '../api';
import * as actions from '../actions';

export function* fetchContributors(action) {
  const response = yield API.doFetch(action.url);
  const contributors = yield response.json();
  const cleanedContributors = yield API.cleanContributors(contributors);
  yield put(actions.storeContributors(cleanedContributors));

  const links = yield response.headers.get('Link');
  const parsedLinks = yield API.parseLinkHeader(links);
  const next = yield parsedLinks.next;

  if (next) {
    yield put(actions.getContributors(next));
  }

  yield determineContributor();
}

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

export function* listenForGetContributors() {
  yield takeLatest('GET_CONTRIBUTORS', fetchContributors);
}

export default listenForGetContributors;
