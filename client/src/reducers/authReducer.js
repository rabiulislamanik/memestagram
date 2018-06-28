import { SET_CURRENT_USER } from "../actions/actionTypes";

const initialState = {
    isAuthenticated : false,
    user:{}
};

export default function(state=initialState,action){
    switch(action.type){
        case SET_CURRENT_USER:
            console.log(!(Object.keys(action.payload).length === 0 && action.constructor === Object));   
            return{
                ...state,
                isAuthenticated : !(Object.keys(action.payload).length === 0 && action.constructor === Object),
                user: action.payload,
            };
        default :
            return state;
    }
}