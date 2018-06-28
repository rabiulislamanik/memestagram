import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

class Landing extends Component {
  componentDidMount(){
    if(this.props.auth.isAuthenticated){
      this.props.history.push('/home');
    }
  }
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
Landing.propTypes = {
  auth: PropTypes.object.isRequired
};
const mapStateToProps = (state)=>({
  auth:state.auth
})

export default connect(mapStateToProps)(Landing);
