import { IPlainPost as NicePlainPost } from 'nice-drink/MarkdownPost';

export type PlainPost = NicePlainPost;

export interface IContentJSON {
  title: string;
  content: PlainPost[];
}
