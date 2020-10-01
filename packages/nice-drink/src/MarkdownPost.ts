import path from 'path';
import fs from 'fs';
import { execSync } from 'child_process';
import debug from 'debug';
import yaml from 'js-yaml';
import { AsyncConstructor } from 'async-constructor';
// eslint-disable-next-line import/no-cycle
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
  date: string;
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

export default class MarkdownPost extends AsyncConstructor {
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
  constructor(filepath: string, force: boolean) {
    super(async () => {
      await fsp.readFile(filepath, { encoding: 'utf8' })
        .then(mardownFile => {
          if (hasFrontMatter(mardownFile) && !force) {
            console.log(
              warning(`${path.relative(process.cwd(), filepath)} already has front matter.`),
            );
            return mardownFile;
          }

          const filename = path.parse(filepath).name;
          const frontmatter = {} as IFrontMatter;
          frontmatter.title = filename;
          frontmatter.author = getConfig().author;
          frontmatter.created = formatDate(getCreatedAt(filepath));
          frontmatter.modified = formatDate(getUpdatedAt(filepath));
          frontmatter.status = this.frontMatter.status || 'draft';
          this.frontMatter = frontmatter;

          this.rawContent = mardownFile.trim();
          this.filepath = filepath;
          this.parse(mardownFile);

          const mardownFileWithFrontMatter = this.formatMarkdown();

          fsp.writeFile(filepath, mardownFileWithFrontMatter);
          return mardownFileWithFrontMatter;
        });
    });
  }

  private parse(rawContent: string) {
    const separatorStart = this.rawContent.indexOf(FRONT_MATTER_SEPARATOR);

    // front matter doesn't exsit
    if (separatorStart < 0) {
      this.content = rawContent;
      return;
    }

    const separatorEnd = this.rawContent.indexOf(FRONT_MATTER_SEPARATOR, separatorStart + 3);
    const frontMatter = this.rawContent.substring(separatorStart + 3, separatorEnd);
    this.frontMatter = yaml.safeLoad(frontMatter) as IFrontMatter;
    this.content = this.rawContent.substring(separatorEnd + 3).trim();
  }

  public hasFrontMatter(): boolean {
    return !!this.frontMatter;
  }

  public setFrontMatter(fm: IFrontMatter) {
    Object.assign(this.frontMatter, fm);
  }

  public format():string {
    return this.formatMarkdown();
  }

  public toObject() {
    return {
      ...this.frontMatter,
      content: this.content,
      filePath: this.filepath,
      fileName: this.filepath, // FIXME:
    };
  }

  private formatMarkdown() {
    return `---\n${yaml.dump(this.frontMatter)}---\n\n${this.content}`;
  }
}
