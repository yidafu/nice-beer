import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { useDispatch, Provider } from 'react-redux';
import Index from './pages/index';
import PostPage from './pages/post';
import store from './store/main';
import { getConfig, getContent } from './store/actions';
import './App.css';

const App: React.FC = () => {
  const dispatch = useDispatch();
  dispatch(getConfig());
  dispatch(getContent());

  return (

  <Provider store={store}>
      <Router>
        <Route path="/" exact component={Index} />
        <Route path="/post/:filename" component={PostPage} />
      </Router>
  </Provider>
  );
};

export default App;
