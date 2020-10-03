
import {
  put, takeEvery, call,
} from 'redux-saga/effects';
import { getDrikConfig } from '../../network';
import { GET_DRINK_CONFIG_REQ, INIT_APP } from './types';
import { setConfig } from './actions';
import { getContentReq } from '../posts/saga';

export function* getDrikConfigReq() {
  const config = yield call(getDrikConfig);
  yield put(setConfig(config));
}

export function* initApp() {
  yield getDrikConfig();
  yield getContentReq();
  // yield put(setConfig(config));
}

export function* watchPostAction() {
  yield takeEvery(GET_DRINK_CONFIG_REQ, getDrikConfigReq);
}

export function* watchInitApp() {
  yield takeEvery(INIT_APP, initApp);
}
