import {
  ConfigState, SET_DRINK_CONFIG, GET_DRINK_CONFIG_REQ, INIT_APP,
} from './types';

export function setConfig(config: ConfigState) {
  return {
    type: SET_DRINK_CONFIG,
    payload: config,
  };
}

export function getConfig() {
  return {
    type: GET_DRINK_CONFIG_REQ,
  };
}

export function initApp() {
  return {
    type: INIT_APP,
  };
}
