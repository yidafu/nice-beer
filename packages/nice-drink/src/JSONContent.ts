import path from 'path';
// eslint-disable-next-line import/no-cycle
import { MarkdownPost } from './MarkdownPost';
import {
  CURR_PATH,
} from './constant';
import {
  getConfig,
  IContentItem,
  IJSONContent
} from './utils';

export function generateJSONContent(markdownPosts: MarkdownPost[]) {
  const config = getConfig();
  const contentJSON: IJSONContent = {
    title: config.title,
    content: [],
  };
  const sortBy = config.sortBy;

  markdownPosts.sort((pre, next) =>
      new Date(next.frontMatter[sortBy]).getTime() - new Date(pre.frontMatter[sortBy]).getTime(),
    ).filter(
      post => post.frontMatter.status === 'publish',
    ).forEach(post => {
      const url = path.relative(CURR_PATH, post.filepath)
                      .replace('\\', '/'); // compatible with windows
      const filename = path.parse(url).name;
      const contentItem: IContentItem = {
        ...post.frontMatter,
        filepath: url,
        filename,
      };
      contentJSON.content.push(contentItem);
    });

  return contentJSON;
}
