import path from 'path';
import yaml from 'js-yaml';
import fs from 'fs';
import {
  hasFrontMatter, warning, formatDate, getConfig,
} from './utils';

const { promises: fsp } = fs;

export interface FrontMatter {
  title: string;
  author: string;
  created: string;
  modified: string;
  status: 'draft' | 'publish';
}

const FRONT_MATTER_SEPARATOR = '---';

export default class MarkdownPost {
  private rawContent: string = '';

  private content: string = '';

  private filePath: string = '';

  private frontMatter: FrontMatter = {} as FrontMatter;

  constructor(filePath: string, rawContent: string) {
    this.rawContent = rawContent.trim();
    this.filePath = filePath;
    this.parse(rawContent);
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
    this.frontMatter = yaml.safeLoad(frontMatter);
    this.content = this.rawContent.substring(separatorEnd + 3).trim();
  }

  public hasFrontMatter(): boolean {
    return !!this.frontMatter;
  }

  public setFrontMatter(fm: FrontMatter) {
    Object.assign(this.frontMatter, fm);
  }

  public format():string {
    const { frontMatter, rawContent } = this;
    return MarkdownPost.formatMarkdown(frontMatter, rawContent);
  }

  public toObject() {
    return {
      ...this.frontMatter,
      content: this.content,
      filePath: this.filePath,
      fileName: this.filePath, // FIXME:
    };
  }

  /* eslint class-methods-use-this: off */
  private static formatMarkdown(frontMatter: FrontMatter, content: string) {
    return `---\n${yaml.dump(frontMatter)}---\n\n${content}`;
  }

  public static init(filepath: string, force: boolean): Promise<MarkdownPost> {
    return fsp.readFile(filepath, { encoding: 'utf8' })
      .then(mardownFile => {
        if (hasFrontMatter(mardownFile) && !force) {
          console.log(
            warning(`${path.relative(process.cwd(), filepath)} already has front matter.`),
          );
          return mardownFile;
        }

        return fsp.stat(filepath)
          .then(stats => {
            const { ctime, mtime } = stats;
            const filename = path.parse(filepath).name;
            const frontmatter = {} as FrontMatter;
            frontmatter.title = filename;
            frontmatter.author = getConfig().author;
            frontmatter.created = formatDate(ctime);
            frontmatter.modified = formatDate(mtime);

            const mardownFileWithFrontMatter = this.formatMarkdown(frontmatter, mardownFile);

            fsp.writeFile(filepath, mardownFileWithFrontMatter);
            return mardownFileWithFrontMatter;
          });
      }).then(content => new MarkdownPost(filepath, content));
  }
}
