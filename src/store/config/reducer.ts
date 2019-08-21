import { SET_DRINK_CONFIG, ConfigState, ConfigActions } from './types';

const initialState: ConfigState = {
  title: '',
  author: '',
  directories: [],
  mode: 'gitbook',
  sortBy: 'created',
  github: {
    user: '',
    repo: '',
  },
};

export default function config(state = initialState, action: ConfigActions): ConfigState {
  switch (action.type) {
    case SET_DRINK_CONFIG:
      return { ...state, ...action.payload };
    default:
      return state;
  }
}
