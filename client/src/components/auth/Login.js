import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {loginUser} from '../../actions/authAction';
import {Link} from 'react-router-dom';
import classnames from 'classnames';

class Login extends Component {
  state={
    email : '',
    password : '',
    errors:{}
  };

  onChange(e){
    this.setState(
      {[e.target.name]:e.target.value}
    );
    // console.log(e.target.value);
  }
  componentDidMount(){
    if(this.props.auth.isAuthenticated){
      this.props.history.push('/home');
    }
  }
  
  componentWillReceiveProps(nextProps){
    if(nextProps.errors){
      this.setState({errors:nextProps.errors});
    }
    if(nextProps.auth.isAuthenticated){
      this.props.history.push('home');
    }
  };
  
  onSubmit(e){
    e.preventDefault();
    const userData = {
      email:this.state.email,
      password:this.state.password
    };
    this.props.loginUser(userData);
  }

  render() {
    const {errors} = this.state;
    return (
      <div>
        <h1>Log In</h1>
        <p>Log in to your memestagram account</p>
        <form onSubmit={(e)=>{this.onSubmit(e)}}>
          <div>
            <input type="text" name="email" className ={classnames('form-control form-control-md',{'is-invalid' : errors.email})} value={this.state.email} onChange={e=>this.onChange(e)} placeholder="Email"/>
            {errors.email && (<div className="invalid-feedback">{errors.email}</div>)}
          </div>
          <div>
            <input type="text" name="password" className ={classnames('form-control form-control-md',{'is-invalid' : errors.password})} value={this.state.password} onChange={e=>this.onChange(e)} placeholder="Password"/>
            {errors.password && (<div className="invalid-feedback">{errors.password}</div>)}
          </div>
          <div>
            <input type="submit"/>
          </div>
        </form>
        <p>{"New to memestagram?"} <Link to="/register" >Create an account</Link></p>

      </div>
    );
  }
}

Login.propTypes={
  loginUser : PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors : PropTypes.object.isRequired
};

const mapStateToProps = (state)=>({
  auth:state.auth,
  errors : state.errors
});

export default connect(mapStateToProps,{loginUser})(Login);
