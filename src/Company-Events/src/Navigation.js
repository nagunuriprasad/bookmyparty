import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => (
  <nav>
    <Link to="/catering"></Link>
    <Link to="/venues"></Link>
    <Link to="/decoration"></Link>
    <Link to="/photo-video"></Link>
    <Link to="/dj-lights"></Link>
    <Link to="/entertainment"></Link>
    <Link to="/others"></Link>
  </nav>
);

export default Navigation;
