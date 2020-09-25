import {
  PostActions, PostState, SET_CONTENT, SET_POST, NOT_FOUND_POST,
} from './types';

const initalState: PostState = {
  currentPost: {
    title: '',
    author: '',
    created: '',
    modified: '',
    fileName: '',
    filePath: '',
  },
  list: [],
  loaded: false,
};

export default function posts(state = initalState, action: PostActions) {
  switch (action.type) {
    case SET_CONTENT:
      return {
        currentPost: state.currentPost,
        list: action.payload,
        loaded: true,
      };
    case SET_POST:
      return {
        currentPost: action.payload,
        loaded: state.loaded,
        list: state.list.map(post => {
          if (post.filePath === action.payload.filePath) {
            return action.payload;
          }
          return post;
        }),
      };
    case NOT_FOUND_POST:
      return {
        loaded: state.loaded,
        list: state.list,
        currentPost: { notFound: true },
      };
    default: return state;
  }
}
