import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {registerUser} from '../../actions/authAction';

class Register extends Component {
  state={
    name: '',
    email : '',
    password : '',
    confirmedpassword:'',
    errors:{}
  };

  onChange(e){
    this.setState(
      {[e.target.name]:e.target.value}
    );
    //console.log(e.target.value);
  }

  onSubmit(e){
    e.preventDefault();
    const newUser = {
      name:this.state.name,
      email:this.state.email,
      password:this.state.password,
      confirmedpassword:this.state.confirmedpassword
    };

    this.props.registerUser(newUser,this.props.history);
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
  };

  render() {
    const {errors} = this.state;
    //console.log(errors);
    return (
      <div>
        <h1>Sign Up</h1>
        <p>Create your account on the Dankest Memesite</p>
        <form onSubmit={(e)=>{this.onSubmit(e)}}>
          <div>
            <input type="text" name="name" className ={classnames('form-control form-control-md',{'is-invalid' : errors.name})} value={this.state.name} onChange={e=>this.onChange(e)} placeholder="Name"/>
            {errors.name && (<div className="invalid-feedback">{errors.name}</div>)}
          </div>
          <div>
            <input type="text" name="email" className ={classnames('form-control form-control-md',{'is-invalid' : errors.email})} value={this.state.email} onChange={e=>this.onChange(e)} placeholder="Email"/>
            {errors.email && (<div className="invalid-feedback">{errors.email}</div>)}
          </div>
          <div>
            <input type="text" name="password" className ={classnames('form-control form-control-md',{'is-invalid' : errors.password})} value={this.state.password} onChange={e=>this.onChange(e)} placeholder="Password"/>
            {errors.password && (<div className="invalid-feedback">{errors.password}</div>)}
          </div>
          <div>
            <input type="text" name="confirmedpassword" className ={classnames('form-control form-control-md',{'is-invalid' : errors.confirmedpassword})} value={this.state.confirmedpassword} onChange={e=>this.onChange(e)} placeholder="Confirm password"/>
            {errors.confirmedpassword && (<div className="invalid-feedback">{errors.confirmedpassword}</div>)}
          </div>
          <div>
            <input type="submit"/>
          </div>
        </form>
      </div>
    );
  }
}

Register.propTypes = {
  registerUser : PropTypes.func.isRequired,
  auth : PropTypes.object.isRequired,
  errors : PropTypes.object.isRequired
};
const mapStateToProps = (state)=>({
  auth:state.auth,
  errors : state.errors
});

export default connect(mapStateToProps,{registerUser})(withRouter(Register));
