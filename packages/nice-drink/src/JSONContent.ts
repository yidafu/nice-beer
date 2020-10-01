import path from 'path';
import fse from 'fs-extra';
// eslint-disable-next-line import/no-cycle
import MarkdownPost from './MarkdownPost';
import {
  CURR_PATH,
  CONTENT_JSON,
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

  markdownPosts.sort((pre, next) =>
      new Date(next.frontMatter.created).getTime() - new Date(pre.frontMatter.created).getTime(),
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

  return fse.writeJSON(
    path.join(CURR_PATH, CONTENT_JSON),
    contentJSON, {
      spaces: 2
    },
  );
}
