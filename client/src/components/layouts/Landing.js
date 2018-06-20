import React, { Component } from 'react';
import {Link} from 'react-router-dom';
class Landing extends Component {
  render() {
    return (
      <div className="landing">
        <h1>Social Network for Hard-core memers and meme-lovers</h1>
        <Link to="/register">Sign Up</Link>
        <Link to="/login">Log In</Link>
      </div>
    );
  }
}

export default Landing;
