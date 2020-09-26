import * as React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Layout from '../components/Layout';
import Article from '../components/Article';
import { AppState } from '../store/main';
import { getPost } from '../store/actions';
import { Post } from '../types';
import 'github-markdown-css/github-markdown.css';

export interface IPostProps {
  match: any;
  getPost: Function;
  post: Post | { notFound: boolean },
}

class PostPage extends React.Component<IPostProps> {
  componentDidMount() {
    this.props.getPost(this.props.match.params.filename);
  }

  public render() {
    const { post } = this.props;
    return (
      <Layout>
        {!post && typeof (post as Post).title === 'undefined'
          ? <Redirect to="/404" />
          : <Article {...(post as Post)} />}
      </Layout>
    );
  }
}


export default connect((state: AppState) => ({ post: state.posts.currentPost }), { getPost })(PostPage);
