import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {getCurrentProfile} from '../../actions/profileAction';

class Profile extends Component {
  componentDidMount(){
    this.props.getCurrentProfile();
  }
  render() {
    const user= this.props.auth.user;
    const {profile,loading} = this.props.profile;
    let profileContent;
    if(profile == null || loading==true){
      profileContent = (
        <div>
          <img src={process.env.PUBLIC_URL + '/images/spinner.gif'}
          alt="loading"/>
        </div>
      );
    }
    else{
      profileContent = (
        <div>
          <h1>Profile</h1>
        </div>
      );
    }
    return (
      <div className = "container">
        {profileContent}
      </div>
    )
  }
}

Profile.propTypes = {
  getCurrentProfile : PropTypes.func.isRequired,
  auth : PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};
const mapStateToProps = (state) => ({
    auth:state.auth,
    profile: state.profile
});
export default connect(mapStateToProps,{getCurrentProfile})(Profile);