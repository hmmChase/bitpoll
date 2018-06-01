import { put, takeLatest } from 'redux-saga/effects';
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
}

export function* listenForGetContributors() {
  yield takeLatest('GET_CONTRIBUTORS', fetchContributors);
}
export default listenForGetContributors;
