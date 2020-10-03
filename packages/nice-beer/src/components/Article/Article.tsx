import React, { useEffect } from 'react';
import marked from '../../marked';
// ts-ignore
import { Post } from '../../types';
import styles from './article.module.scss';

interface Props extends Post {

}

const Article: React.FC<Props> = props => {
  const html = marked(props.content || '');
  useEffect(() => {
    (window as any).Prism && (window as any).Prism.highlightAll();
  });
  return (
    <article
      className={`markdown-body ${styles.markdownBody}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};

export default Article;
