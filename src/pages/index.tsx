import * as React from 'react';
import { connect } from 'react-redux';
import { getContent, getConfig } from '../store/actions';
import { AppState } from '../store/main';
import { Post } from '../types';
import PostList from '../components/PostList';
import Layout from '../components/Layout';

export interface IIndexProps {
  getContent: Function;
  getConfig: Function;
  config: any;
  posts: Post[];
}

class Index extends React.Component<IIndexProps> {
  public render() {
    return (
      <Layout>
        <PostList />
      </Layout>
    );
  }
}

export default connect((store: AppState) => ({ config: store.config, posts: store.posts.list }), { getContent, getConfig })(Index);
