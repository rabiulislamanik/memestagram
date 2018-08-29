import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {logOutUser} from '../../actions/authAction';
import {clearCurrentProfile} from '../../actions/profileAction';

class Navbar extends Component {
  onClickLogOut(e){
    e.preventDefault();
    this.props.clearCurrentProfile();
    this.props.logOutUser();
    window.location.href = '/login';
  }
  render() {

    const {isAuthenticated,user} = this.props.auth;
    const authenticatedLink = (
      <ul>
        <a href="#" onClick={(e)=>this.onClickLogOut(e)}><img src={user.profile_image} style={{width:'25px'}} className="rounded-circle" alt={user.user_name}/>LogOut</a>
      </ul>
    );
    const guestLink = (
      <ul>
        <li><Link to="/register">Sign Up</Link></li>
        <li><Link to="/login">Log In</Link></li>
      </ul>
    );
    return (
      <div>
        <nav>
          <div className="container">
            <ul>
              <li><Link to="/"><img src={process.env.PUBLIC_URL + '/images/logo.png'}  alt="logo"/></Link></li>
              <li><span>Memestagram</span></li>
            </ul>
            {user.user_name}
            {isAuthenticated ? authenticatedLink : guestLink}
          </div>
        </nav>
      </div>
    );
  }
}

Navbar.propTypes={
  logOutUser : PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStatetoProps= (state) => ({
  auth:state.auth
})
export default connect(mapStatetoProps,{logOutUser,clearCurrentProfile})(Navbar);
