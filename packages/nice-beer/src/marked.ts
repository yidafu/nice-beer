import marked from 'marked';
import { getBaseUrl } from './utils';

export default function parseMarkdown(src: string) {
  const tokens = marked.lexer(src);
  const imgLingReg = /!\[\]\((.+?)\)/;
  tokens.forEach(token => {
    if (token.type === 'paragraph') {
      // const res = imgLingReg.exec();
      // eslint-disable-next-line no-param-reassign
      token.text = token.text.replace(imgLingReg, (match, p1) => `![](${getBaseUrl()}/posts${p1.substring(1)})`);
    }
  });
  return marked.Parser.parse(
    tokens,
    (marked as any).getDefaults(),
  );
}
