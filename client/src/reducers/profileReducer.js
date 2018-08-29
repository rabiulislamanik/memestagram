import {GET_PROFILE,PROFILE_LOADING, CLEAR_CURRENT_PROFILE} from '../actions/actionTypes';
const initialState = {
    profile : null ,
    loading:false
}

export default function (state=initialState,action){
    switch (action.type){
        case PROFILE_LOADING:
            return {
                ...state,
                loading : true
            }
        case GET_PROFILE:
            return {
                ...state,
                profile:action.payload,
                loading:false
            }
        case CLEAR_CURRENT_PROFILE:
        return {
            ...state,
            payload:null
        }
        default : 
            return state;
        
    }
}