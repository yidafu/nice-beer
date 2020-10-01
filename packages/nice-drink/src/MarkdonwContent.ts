import path from 'path';
import fs from 'fs';

// eslint-disable-next-line import/no-cycle
import MarkdownPost from './MarkdownPost';
import {
  CURR_PATH, SUMMARY_MD,
} from './constant';

const fsp = fs.promises;

export function generateMarkdonwContent(markdownPosts: MarkdownPost[]) {
  const summaryMd = ['# SUMMARY\n'];
  
  markdownPosts.sort((pre, next) =>
    new Date(next.frontMatter.created).getTime() - new Date(pre.frontMatter.created).getTime()
  ).forEach(post => {
    const url = (path.relative(CURR_PATH, post.filepath)).replace('\\', '/');
    summaryMd.push(`* [${post.frontMatter.title}](${url})`);
  });

  return fsp.writeFile(
    path.join(CURR_PATH, SUMMARY_MD),
    summaryMd.join('\n'),
  );
}
