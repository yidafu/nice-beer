import React from 'react';
import Navbar from './Navbar';

interface Props {

}

const Layout: React.FC<Props> = props => (
  <>
    <Navbar />
    {props.children}
  </>
);

export default Layout;
