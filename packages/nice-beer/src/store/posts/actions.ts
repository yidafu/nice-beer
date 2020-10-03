import {
  SET_CONTENT,
  SET_POST,
  NOT_FOUND_POST,
  SetContentAction,
  SetPostAction,
  GET_CONTENT_JSON_REQ,
  GET_POST_REQ,
} from './types';
import { PlainPost } from '../../types';


export function getContent() {
  return {
    type: GET_CONTENT_JSON_REQ,
  };
}

export function setContent(content: PlainPost[]): SetContentAction {
  return {
    type: SET_CONTENT,
    payload: content,
  };
}

export function getPost(fileName: string) {
  return {
    type: GET_POST_REQ,
    payload: fileName,
  };
}

export function setPost(post: PlainPost): SetPostAction {
  return {
    type: SET_POST,
    payload: post,
  };
}

export function notFoundPost() {
  return {
    type: NOT_FOUND_POST,
  };
}
