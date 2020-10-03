import React from 'react';
import { Link } from 'react-router-dom';
import { CalendarIcon } from '@primer/octicons-react'
import dayjs from 'dayjs';
import { PlainPost } from '../../types';

interface Props extends PlainPost {
}

const ListItem: React.FC<Props> = props => (
  <div className="post__list-item" key={props.filepath}>
    <h1><Link to={`post/${props.filename}`}>{props.title}</Link></h1>
    <p>
      <CalendarIcon size={16} />{' '}
      {dayjs(props.created).format('YYYY-MM-DD')}
    </p>
  </div>
);

export default ListItem;
