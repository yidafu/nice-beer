import * as React from 'react';
import { connect } from 'react-redux';
import ListItem from './ListItem';
import { AppState } from '../../store/main';
import { Post } from '../../types';

export interface IPostListProps {
  posts: Post[];
}

const PostList: React.FC<IPostListProps> = props => (
  <div className="post__body">
    {props.posts.map(post => (
      <ListItem {...post}>{post.title}</ListItem>
    ))}
  </div>
);

export default connect((state: AppState) => ({ posts: state.posts.list }))(PostList);
