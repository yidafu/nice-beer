export interface Post {
  title: string;
  content?: string;
  filePath: string;
  fileName: string;
  author: string;
  created: string;
  modified: string;
}

export interface IContentJSON {
  title: string;
  content: Post[];
}
