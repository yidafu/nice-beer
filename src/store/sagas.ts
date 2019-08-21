import { all, fork } from 'redux-saga/effects';
import { watchPostAction, watchInitApp } from './config/saga';
import { watchGetContentReq, watchGetPostReq } from './posts/saga';

export default function* rootSaga() {
  yield all([
    fork(watchPostAction),
    fork(watchInitApp),
    fork(watchGetContentReq),
    fork(watchGetPostReq),
  ]);
}
