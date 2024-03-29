import { PlainPost } from '../../types';

export const GET_CONTENT_JSON_REQ = 'GET_CONTENT_JSON_REQ';

export const GET_POST_REQ = 'GET_POST_REQ';

export const SET_CONTENT = 'SET_CONTENT';

export const SET_POST = 'SET_POST';

export const NOT_FOUND_POST = 'NOT_FOUND_POST';

export type PostState = {
  currentPost: PlainPost | { notFound: boolean };
  list: PlainPost[];
  loaded: boolean;
};

export interface GetPostAction {
  type: typeof GET_POST_REQ,
  payload: string;
}

export interface SetContentAction {
  type: typeof SET_CONTENT;
  payload: PlainPost[];
}

export interface SetPostAction {
  type: typeof SET_POST;
  payload: PlainPost;
}

export interface NotFoundPost {
  type: typeof NOT_FOUND_POST,
}
export type PostActions = SetContentAction | SetPostAction | NotFoundPost;
