import path from 'path';
import fs from 'fs';
import { execSync } from 'child_process';
import debug from 'debug';
import yaml from 'js-yaml';
import {
  hasFrontMatter, warning, formatDate, getConfig,
} from './utils';

const { promises: fsp } = fs;

const log = debug('nice-drink:MarkdownPOst');


export enum PostStatus {
  PUBLISH = 'publish',
  DRAFT = 'draft',
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

function getUpdatedAt(filePath: string): Date {
  const command = `git log --pretty="format:%ci" ${filePath} | head -1`;
  log(`getCreatedAt: ${command}`);
  const dateStr = execSync(`git log --pretty="format:%ci" ${filePath} | head -1`).toString();
  log(`create string: ${dateStr}`);
  return new Date(dateStr);
}


function getCreatedAt(filePath: string): Date {
  const command = `git log --reverse --pretty="format:%ci" ${filePath} | head -1`;
  log(`getUpdatedAt: ${command}`);
  const dateStr = execSync(command).toString();
  log(`update string: ${dateStr}`);
  return new Date(dateStr);
}

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
    frontmatter.author = getConfig().author;
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
  public parseMarkdown(rawContent: string) {
    const separatorStart = this.rawContent.indexOf(FRONT_MATTER_SEPARATOR);

    // front matter doesn't exsit
    if (separatorStart < 0) {
      this.content = rawContent;
      return;
    }

    const separatorEnd = this.rawContent.indexOf(FRONT_MATTER_SEPARATOR, separatorStart + 3);
    if (separatorEnd < 0) {
      throw new Error(
        `Syntax Error: Front matter must end with separetor: '${FRONT_MATTER_SEPARATOR}'`);
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

  public toString(): string {
    return this.formatMarkdown();
  }
}


export async function loadMarkdownFile(filepath: string, force: boolean = false) {
  const mardownFile = await fsp.readFile(filepath, { encoding: 'utf-8'});
  const filename = path.parse(filepath).name;
  
  const post = new MarkdownPost(filename, mardownFile);

  if (hasFrontMatter(mardownFile) && !force) {
    console.log(
      warning(`${path.relative(process.cwd(), filepath)} already has front matter.`),
    );
    return post.format();
  }

  post.frontMatter.title = filename;
  post.frontMatter.author = getConfig().author;
  post.frontMatter.created = formatDate(getCreatedAt(filepath));
  post.frontMatter.modified = formatDate(getUpdatedAt(filepath));
  post.filepath = filepath;


  const mardownFileWithFrontMatter = post.format();

  return mardownFileWithFrontMatter; 
}
