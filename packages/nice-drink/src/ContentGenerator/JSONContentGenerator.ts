import path from 'path';
import fs from 'fs';
import { IFrontMatter, MarkdownPost, IPlainPost } from '../MarkdownPost';
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
   content: IPlainPost[];
 }
 
class JSONContentGenerator extends ContentGenerator {

  generate(markdownPosts: MarkdownPost[]): void {
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
        console.log(CURR_PATH, post.filepath ,path.relative(CURR_PATH, post.filepath));
        const url = path.relative(CURR_PATH, post.filepath)
                        .replace('\\', '/'); // compatible with windows
        console.log(url);

        const contentItem: IPlainPost = post.toObject();
        contentItem.filepath = url;
        contentItem.filename = path.parse(url).name;
        contentJSON.content.push(contentItem);
      });
  
    const JSONFileContent = JSON.stringify(contentJSON, null, 2);

    fs.writeFileSync(CURR_PATH + '/content.json', JSONFileContent);
  }
}

export {
  JSONContentGenerator,
};
