import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Index from './pages/index';
import PostPage from './pages/post';
import { getConfig, getContent } from './store/actions';
import './App.css';

const App: React.FC = () => {
  const dispatch = useDispatch();
  dispatch(getConfig());
  dispatch(getContent());

  return (
      <Router>
        <Route path="/" exact component={Index} />
        <Route path="/post/:filename" component={PostPage} />
      </Router>
  );
};

export default App;
