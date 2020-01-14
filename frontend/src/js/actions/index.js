import {ADD_POINT, APP_CHANGE_R, APP_LOGIN, APP_SIGNUP, POINTS_LOADED} from "../constants/action-types";


export function addPoint(payload) {
    return function(dispatch) {
        return fetch("http://localhost:45857/api/add_point",
            {
                method: "POST",
                body: JSON.stringify(payload),
                headers: {'Content-Type': 'application/json'}
            })
            .then(res => res.json())
            .then(json => dispatch({type: ADD_POINT, payload: json}));
    }
}



export function signIn(payload) {
    return function(dispatch) {
        return fetch("http://localhost:45857/api/login",
            {
                method: "POST",
                body: JSON.stringify(payload),
                headers: {'Content-Type': 'application/json'}
            })
            .then(res => res.json())
            .then(json => dispatch({
                type: APP_LOGIN,
                payload: json,
                login: payload.login,
                history: payload.history}));
    }
}

export function signUp(payload) {
    return function(dispatch) {
        return fetch("http://localhost:45857/api/sign_up",
            {
                method: "POST",
                body: JSON.stringify(payload),
                headers: {'Content-Type': 'application/json'}
            })
            .then(res => res.json())
            .then(json => dispatch({
                type: APP_SIGNUP,
                payload: json,
                login: payload.login,
                history: payload.history}));
    }
}

export function getAllPoints(payload) {
    return function(dispatch) {
        return fetch("http://localhost:45857/api/points?username=" + payload.username)
        .then(res => res.json())
        .then(json => {
            dispatch( {type: POINTS_LOADED, payload: json} );
            });
    };
}