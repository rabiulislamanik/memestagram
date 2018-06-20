import React, { Component } from 'react';
import {Link} from 'react-router-dom';
class Navbar extends Component {
  render() {
    return (
      <div>
        <nav>
          <div className="container">
            <ul>
              <li><Link to="/"><img src={process.env.PUBLIC_URL + '/images/logo.png'}  alt="logo"/></Link></li>
              <li><span>Memestagram</span></li>
            </ul>
            <ul>
              <li><Link to="/register">Sign Up</Link></li>
              <li><Link to="/login">Log In</Link></li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}

export default Navbar;
