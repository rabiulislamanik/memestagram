import {GET_ERRORS,SET_CURRENT_USER} from './actionTypes';
import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';

export const registerUser = (userData,history)=>(dispatch)=>{
    axios.post('/users/register' , userData)
      .then(res=> history.push('/login'))
      .catch(err=>
        dispatch({
            type: GET_ERRORS,
            payload : err.response.data
        })
      );
}

export const loginUser = (userData)=>(dispatch)=>{
  axios.post('/users/login' , userData)
    .then(res=>{ 
      const {token} = res.data;
      localStorage.setItem('jwtToken',token);
      //console.log('token',token);
      setAuthToken(token);
      const decoded_token = jwt_decode(token);
      //console.log('decoded token',decoded_token);
      dispatch(setCurrentUser(decoded_token));
    })
    .catch(err=>
      dispatch({
          type: GET_ERRORS,
          payload : err.response.data
      })
    );
}

export const setCurrentUser = (decoded_token)=>{
  return {
    type: SET_CURRENT_USER,
    payload: decoded_token
  };
}

export const logOutUser = ()=>(dispatch)=>{
  localStorage.removeItem('jwtToken');
  setAuthToken(false);
  dispatch(setCurrentUser({}));
}