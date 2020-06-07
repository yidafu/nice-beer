import React from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import { Post } from '../../types';
import styles from './listItem.module.scss';

interface Props extends Post {
}

const ListItem: React.FC<Props> = props => (
  <div className={styles.listItem} key={props.filePath}>
    <h1><Link to={`post/${props.fileName}`}>{props.title}</Link></h1>
    <p>
      Wrote @
      {' '}
      {dayjs(props.created).format('YYYY-MM-DD')}
    </p>
  </div>
);

export default ListItem;
