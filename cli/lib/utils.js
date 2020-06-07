
import yaml from 'js-yaml';
import { FRONT_MATTER_SEPARATOR } from '../bin/constant';


export function parseMarkdown(rawContent) {
  let markdown = {
    content: '',
  };
  const separatorStart = rawContent.indexOf(FRONT_MATTER_SEPARATOR);

    // front matter doesn't exsit
    if (separatorStart < 0) {
      markdown.content = rawContent;
      return;
    }

    const separatorEnd = rawContent.indexOf(FRONT_MATTER_SEPARATOR, separatorStart + 3);
    const frontMatter = rawContent.substring(separatorStart + 3, separatorEnd);
    markdown = {...yaml.safeLoad(frontMatter)};
    markdown.content = rawContent.substring(separatorEnd + 3).trim();
    return markdown;
}
