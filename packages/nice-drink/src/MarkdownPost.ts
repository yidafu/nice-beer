import path from 'path';
import fs from 'fs';
// import debug from 'debug';
import yaml from 'js-yaml';
import {
  hasFrontMatter, warning, formatDate, getCreatedAt, getUpdatedAt
} from './utils';
import { getConfig } from './config';

const { promises: fsp } = fs;

// const log = debug('nice-drink:MarkdownPost');


export enum PostStatus {
  PUBLISH = 'publish',
  DRAFT = 'draft',
}

export interface IPlainPost {
  title: string;
  content?: string;
  filepath: string;
  filename: string;
  author: string;
  created: string;
  modified: string;
}

export interface IFrontMatter {
  title: string;
  author: string;
  created: string;
  modified: string;
  excerpt: string;
  // date: string;
  tags: string[];
  status: PostStatus;
  filepath: string;
  filename: string;
}

const FRONT_MATTER_SEPARATOR = '---';


/**
 * Parse Markdown file to class MarkdownPost instance
 *
 * @export
 * @class MarkdownPost
 */
export class MarkdownPost {
  private rawContent: string = '';

  private content: string = '';

  public filepath: string = '';

  public frontMatter: IFrontMatter = {} as IFrontMatter;

  /**
   * Async Constructor.
   * read markdown file from filepath, get front matter info.
   *
   * @param {string} filepath
   * @param {boolean} force force to update markdown file
   * @memberof MarkdownPost
   */
  constructor(filename: string, mardownFile: string) {
    this.frontMatter = {} as IFrontMatter;
    const frontmatter = this.frontMatter;
    // default front matter
    frontmatter.title = filename;
    frontmatter.status = PostStatus.DRAFT;
    frontmatter.created = formatDate(new Date());
    frontmatter.modified = formatDate(new Date());

    this.rawContent = mardownFile.trim();

    this.parseMarkdown(mardownFile);
  }

  /**
   * split front-matter and post context
   *
   * @param {string} rawContent
   * @returns
   * @memberof MarkdownPost
   */
  private parseMarkdown(rawContent: string) {
    const separatorStart = this.rawContent.indexOf(FRONT_MATTER_SEPARATOR);

    // front matter doesn't exsit
    if (separatorStart < 0) {
      this.content = rawContent;
      return;
    }

    const separatorEnd = this.rawContent.indexOf(FRONT_MATTER_SEPARATOR, separatorStart + 3);
    if (separatorEnd < 0) {
      throw new Error(
        `Syntax Error: Front matter must has with end separetor: '${FRONT_MATTER_SEPARATOR}'`);
    }
    const frontMatter = this.rawContent.substring(separatorStart + 3, separatorEnd);

    Object.assign(this.frontMatter, yaml.safeLoad(frontMatter) as IFrontMatter);

    this.content = this.rawContent.substring(separatorEnd + 3).trim();
  }

  public hasFrontMatter(): boolean {
    return !!this.frontMatter;
  }

  public setFrontMatter(fm: IFrontMatter) {
    Object.assign(this.frontMatter, fm);
  }

  /**
   * alias of formatMarkdown
   *
   * @returns {string}
   * @memberof MarkdownPost
   */
  public format():string {
    return this.formatMarkdown();
  }

  private formatMarkdown() {
    return `---\n${yaml.dump(this.frontMatter)}---\n\n${this.content}`;
  }

  public toObject(): IPlainPost {
    return {
      ...this.frontMatter,
      // content: this.content,
      filepath: this.filepath,
      filename: this.filepath,
    };
  }

  public toString(): string {
    return this.formatMarkdown();
  }
}

/**
 * Node 环境加载, Makrdonw 文件
 *
 * @export
 * @param {string} filepath
 * @param {boolean} [force=false]
 * @returns
 */
export async function loadMarkdownFile(filepath: string, force: boolean = false) {
  const mardownFile = await fsp.readFile(filepath, { encoding: 'utf-8'});
  const filename = path.parse(filepath).name;
  
  const markdownPost = new MarkdownPost(filename, mardownFile);

  // markdownPost.frontMatter.title = filename;
  markdownPost.filepath = filepath;

  if (hasFrontMatter(mardownFile) && !force) {
    console.log(
      warning(`${path.relative(process.cwd(), filepath)} already has front matter.`),
    );
    return markdownPost;
  }

  markdownPost.frontMatter.author = getConfig().author;
  markdownPost.frontMatter.created = formatDate(getCreatedAt(filepath));
  markdownPost.frontMatter.modified = formatDate(getUpdatedAt(filepath));

  return markdownPost; 
}
