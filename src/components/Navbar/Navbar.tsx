import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { AppState } from '../../store/main';
import { ConfigState } from '../../store/config/types';
import styles from './navbar.module.scss';
import { githubConfig } from '../../config';

interface INavbarProps {
  config: ConfigState;
}

const Navbar: React.FC<INavbarProps> = props => (
  <div className={styles.navbar}>
    <div className={styles.navbarContainer}>
      <h1 className={styles.navbarTitle}>
        <Link to="/">{props.config.title}</Link>
      </h1>
      <div className={styles.navbarLinks}>
        <Link to="/">Home</Link>
        {/* <Link to="/about-me">About Me</Link> */}
        <a href={`https://www.github.com/${githubConfig.user}`}>Github</a>
      </div>
    </div>
  </div>
);

export default connect((state: AppState) => ({ config: state.config }))(Navbar);
