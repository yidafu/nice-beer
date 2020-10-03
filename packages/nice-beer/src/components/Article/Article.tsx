import React, { useEffect } from 'react';
import marked from '../../marked';
// ts-ignore
import { PlainPost } from '../../types';

interface Props extends PlainPost {

}

const Article: React.FC<Props> = props => {
  const html = marked(props.content || '');
  useEffect(() => {
    (window as any).Prism && (window as any).Prism.highlightAll();
  });
  return (
    <article
      className='markdown-body article article__markdown'
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};

export default Article;
