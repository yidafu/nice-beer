import { BASE_URL } from './constant';
import { githubConfig } from './config';

export function getBaseUrl() {
  return process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000'
    : `${BASE_URL}/${githubConfig.user}/${githubConfig.repo}@${githubConfig.branch}`;
}
