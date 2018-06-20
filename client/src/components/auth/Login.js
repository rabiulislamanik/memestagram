import React, { Component } from 'react';
import {Link} from 'react-router-dom';

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
    console.log(e.target.value);
  }

  onSubmit(e){
    e.preventDefault();
    const user = {
      email:this.state.email,
      password:this.state.password
    };
    console.log(user);
  }

  render() {
    return (
      <div>
        <h1>Log In</h1>
        <p>Log in to your memestagram account</p>
        <form onSubmit={(e)=>{this.onSubmit(e)}}>
          <div>
            <input type="text" name="email" value={this.state.email} onChange={e=>this.onChange(e)} placeholder="Email"/>
          </div>
          <div>
            <input type="text" name="password" value={this.state.password} onChange={e=>this.onChange(e)} placeholder="Password"/>
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

export default Login;
