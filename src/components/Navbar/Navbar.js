import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/"> Image Upload </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;