import path from 'path';
// eslint-disable-next-line import/no-cycle
import { MarkdownPost } from './MarkdownPost';
import { CURR_PATH } from './constant';
import { getConfig } from './utils';

export function generateMarkdonwContent(markdownPosts: MarkdownPost[]) {
  const config = getConfig();
  const summaryMd = ['# SUMMARY\n'];
  const sortBy = config.sortBy;
  
  markdownPosts.sort((pre, next) =>
    new Date(next.frontMatter[sortBy]).getTime() - new Date(pre.frontMatter[sortBy]).getTime()
  ).forEach(post => {
    const url = (path.relative(CURR_PATH, post.filepath)).replace('\\', '/');
    summaryMd.push(`* [${post.frontMatter.title}](${url})`);
  });

  return summaryMd.join('\n');
}
