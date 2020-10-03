import path from 'path';
import { IFrontMatter, MarkdownPost } from '../MarkdownPost';
import {
  CURR_PATH,
} from '../constant';
import { ContentGenerator } from './ContentGenerator';
import { getConfig } from '../config';


export interface IMarkdonwPost extends IFrontMatter {
  content: string;
 }
 
 export interface IContentItem extends IFrontMatter {
   filepath: string;
   filename: string;
 }
 
 export interface IJSONContent {
   title: string;
   content: IContentItem[];
 }
 
class JSONContentGenerator extends ContentGenerator {

  generate(markdownPosts: MarkdownPost[]): string {
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
  
    return JSON.stringify(contentJSON, null, 2);
  }
}
export function generateJSONContent() {
 
}

export {
  JSONContentGenerator,
};
