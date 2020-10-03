import * as React from 'react';
import { connect } from 'react-redux';
import ListItem from './ListItem';
import { AppState } from '../../store/main';
import { PlainPost } from '../../types';

export interface IPostListProps {
  posts: PlainPost[];
}

const PostList: React.FC<IPostListProps> = props => (
  <div className="post post__body">
    {props.posts.map(post => (
      <ListItem key={post.title} {...post}>{post.title}</ListItem>
    ))}
  </div>
);

export default connect((state: AppState) => ({ posts: state.posts.list }))(PostList);
