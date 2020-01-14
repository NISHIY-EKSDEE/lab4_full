import {DEFAULT_URL} from "../constants/others";
import {
    APP_LOGIN,
    APP_LOGIN_FAIL,
    APP_LOGIN_SUCCESS,
    APP_SIGNUP,
    APP_SIGNUP_FAIL,
    APP_SIGNUP_SUCCESS
} from "../constants/action-types";


const loginMiddleware = store => next => action =>{
    switch (action.type) {
        case APP_LOGIN:
            if(action.payload.code === 200){
                store.dispatch({type: APP_LOGIN_SUCCESS, payload: action.login});
                window.localStorage.setItem("user", action.login);
                action.history.push("/");
            }else{
                store.dispatch({type: APP_LOGIN_FAIL, payload: action.login})
            }
            break;
        case APP_SIGNUP:
            if(action.payload.code === 200){
                store.dispatch({type: APP_SIGNUP_SUCCESS, payload: action.login})
                action.history.push("/");
            }else{
                store.dispatch({type: APP_SIGNUP_FAIL, payload: action.login})
            }
            break;
    }
    return(next(action))
};



export default loginMiddleware;