import React from 'react';
import { Link } from 'react-router-dom';
import GoogleAuth from './GoogleAuth';

const NavBar = () => {
  return (
    <div className="ui secondary pointing menu" style={{marginTop: '2%'}}>
      <Link to="/" className="item">
          <h3>Stream it!</h3>
      </Link>
      <div className="right menu">
        <Link to="/" className="item">Home</Link>
        <GoogleAuth />
      </div>

    </div>
  );
};

export default NavBar;
