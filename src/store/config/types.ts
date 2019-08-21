export const SET_DRINK_CONFIG = 'SET_DRINK_CONFIG';

export const GET_DRINK_CONFIG = 'GET_DRINK_CONFIG';

export const GET_DRINK_CONFIG_REQ = 'GET_DRINK_CONFIG_REQ';

export const INIT_APP = 'INIT_APP';

export interface ConfigState {
  title: string;
  author: string;
  directories: string[];
  mode: 'gitbook' | 'json';
  sortBy: 'created' | 'modified';
  github: {
    user: string;
    repo: string;
  }
}


export interface SetConfigAction {
  type: typeof SET_DRINK_CONFIG,
  payload: ConfigState,
}

export interface GetConfigAction {
  type: typeof GET_DRINK_CONFIG,
}

export type ConfigActions = SetConfigAction | GetConfigAction;
