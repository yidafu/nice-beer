import axios from 'axios';
import yaml from 'js-yaml';
import { DRINK_YAML, CONTENT_JSON } from './constant';
import { IContentJSON } from './types';
import { getBaseUrl } from './utils';


export function getDrikConfig(): Promise<any> {
  const baseUrl = getBaseUrl();
  return axios.get(`${baseUrl}/${DRINK_YAML}`, {
    responseType: 'text',
  }).then(resp => {
    if (resp && resp.data) {
      return yaml.load(resp.data);
    }
    return {};
  });
}


export function getContent() {
  const baseUrl = getBaseUrl();
  return axios.get<IContentJSON>(`${baseUrl}/${CONTENT_JSON}`, {
    responseType: 'text',
  }).then(resp => {
    if (resp && resp.data) {
      return resp.data.content;
    }
    return [];
  });
}

export function getPost(filePath: string) {
  const baseUrl = getBaseUrl();
  return axios.get(`${baseUrl}/${filePath}`, {
    responseType: 'text',
  }).then(resp => {
    if (resp && resp.data) {
      return resp.data;
    }
    return '';
  });
}
