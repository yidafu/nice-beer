import * as React from 'react';
import { connect } from 'react-redux';
import ListItem from './ListItem';
import { AppState } from '../../store/main';
import { Post } from '../../types';
import styles from './postList.module.scss';

export interface IPostListProps {
  posts: Post[];
}

const PostList: React.FC<IPostListProps> = props => (
  <div className={styles.postBody}>
    {props.posts.map(post => (
      <ListItem {...post}>{post.title}</ListItem>
    ))}
  </div>
);

export default connect((state: AppState) => ({ posts: state.posts.list }))(PostList);
