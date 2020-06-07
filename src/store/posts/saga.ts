import {
  put, takeEvery, call, delay, select,
} from 'redux-saga/effects';
import { parseMarkdown } from '@dovyih/nice-drink-cli/lib/utils.js';
import { getContent, getPost } from '../../network';
import { setContent, setPost, notFoundPost } from './actions';
import { GET_CONTENT_JSON_REQ, GET_POST_REQ, GetPostAction } from './types';
import { AppState } from '../main';
import { Post } from '../../types';


export function* getContentReq() {
  const content = yield call(getContent);
  yield put(setContent(content));
}

export function* getPostQeq(action: GetPostAction) {
  // let loaded = false;
  const loaded = yield select((state: AppState) => state.posts.loaded);
  if (!loaded) {
    yield delay(500);
  }
  // FIXME: getPostQeq may been called before SET_CONTENT
  const posts: Post[] = yield select((state: AppState) => state.posts.list);
  const p = posts.find(p => p.fileName === action.payload);
  if (p) {
    let MdPost: Post = {} as Post;
    if (!p.content) {
      const postContent = yield call(getPost, p.filePath);
      MdPost = parseMarkdown(postContent);
      MdPost.filePath = p.filePath;
      MdPost.fileName = action.payload;
    } else {
      MdPost = p;
    }
    yield put(setPost(MdPost));
  } else {
    yield put(notFoundPost());
  }
}

export function* watchGetContentReq() {
  yield takeEvery(GET_CONTENT_JSON_REQ, getContentReq);
}

export function* watchGetPostReq() {
  yield takeEvery(GET_POST_REQ, getPostQeq);
}
