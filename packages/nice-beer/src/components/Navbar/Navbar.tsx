import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { AppState } from '../../store/main';
import { ConfigState } from '../../store/config/types';
import { githubConfig } from '../../config';

interface INavbarProps {
  config: ConfigState;
}

const Navbar: React.FC<INavbarProps> = props => (
  <header className="navbar navbar__top-bar--shadow">
    <div className="navbar__box">
      <div className="navbar__logo">
        <h1 className="navbar__title--large">
          <Link to="/">{props.config.title}</Link>
        </h1>
      </div>

      <div className="navbar__append">
        <Link to="/">Home</Link>
        {/* <Link to="/about-me">About Me</Link> */}
        <a href={`https://www.github.com/${githubConfig.user}`}>Github</a>
      </div>
    </div>

  </header>
);

export default connect((state: AppState) => ({ config: state.config }))(Navbar);
