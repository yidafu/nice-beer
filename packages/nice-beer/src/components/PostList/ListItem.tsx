import React from 'react';
import { Link } from 'react-router-dom';
import { CalendarIcon } from '@primer/octicons-react'
import dayjs from 'dayjs';
import { Post } from '../../types';

interface Props extends Post {
}

const ListItem: React.FC<Props> = props => (
  <div className="post__list-item" key={props.filePath}>
    <h1><Link to={`post/${props.fileName}`}>{props.title}</Link></h1>
    <p>
      <CalendarIcon size={16} />{' '}
      {dayjs(props.created).format('YYYY-MM-DD')}
    </p>
  </div>
);

export default ListItem;
