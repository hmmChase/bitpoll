import { put, select, takeLatest } from 'redux-saga/effects';
import * as API from '../api';
import * as actions from '../actions';

export function* handleContributors(action) {
  yield fetchContributors(action);
  yield determineContributor();
}

export const stateContributors = state => state.contributors;
export const stateUserId = state => state.user.id;

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
}

export function* determineContributor() {
  const contributors = yield select(stateContributors);
  // console.log('contributors: ', contributors);

  const userId = yield select(stateUserId);
  // console.log('userId: ', userId);

  const contribIds = yield Object.keys(contributors);
  // console.log('contribIds: ', contribIds);

  let inc = yield contribIds.includes(contributor => {
    console.log('contributor: ', contributor);
    const radix = 10;

    return parseInt(contributor, radix) === parseInt(userId, radix);
  });

  inc = true;
  // console.log('inc: ', inc);

  yield put(actions.storeIsContributor(inc));
}

export function* listenForGetContributors() {
  yield takeLatest('GET_CONTRIBUTORS', handleContributors);
}

export default listenForGetContributors;
