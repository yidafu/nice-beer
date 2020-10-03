import path from 'path';
import fs from 'fs';
import { MarkdownPost } from '../MarkdownPost';
import { CURR_PATH } from '../constant';
import { ContentGenerator } from './ContentGenerator';
import { getConfig } from '../config';

class MarkdonwContentGenerator extends ContentGenerator {
  generate(markdownPosts: MarkdownPost[]): void {
    const config = getConfig();
    const summaryMd = ['# SUMMARY\n'];
    const sortBy = config.sortBy;
    
    markdownPosts.sort((pre, next) =>
      new Date(next.frontMatter[sortBy]).getTime() - new Date(pre.frontMatter[sortBy]).getTime()
    ).forEach(post => {
      const url = path.relative(CURR_PATH, post.filepath)
                      .replace('\\', '/'); // compatible with windows
      summaryMd.push(`* [${post.frontMatter.title}](${url})`);
    });
  
    const markdownFileContent = summaryMd.join('\n');
    fs.writeFileSync(CURR_PATH + '/SUMMARY.md', markdownFileContent);
  }
}

export {
  MarkdonwContentGenerator,
};
