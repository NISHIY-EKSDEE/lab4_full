import {
    ADD_POINT,
    APP_CHANGE_R, APP_LOGIN_FAIL,
    APP_LOGIN_SUCCESS,
    APP_LOGOUT, APP_SIGNUP_FAIL,
    APP_SIGNUP_SUCCESS,
    POINTS_LOADED
} from "../constants/action-types";
import {LOGIN_ERROR, SIGNUP_ERROR} from "../constants/others";

const initialState = {
        points: [],
        login: window.localStorage.getItem("user"),
        drawing: [],
        error: null,
        r: 0
};

function rootReducer(state = initialState, action) {
    switch (action.type) {

        case  ADD_POINT:
            return Object.assign({}, state, {
                points: state.points.concat(action.payload.point)
            });

        case APP_CHANGE_R:
            return Object.assign({}, state, {
                r: action.payload
            });

        case POINTS_LOADED:
            return Object.assign({}, state, {
                points: action.payload.points
            });

        case APP_SIGNUP_SUCCESS:
        case APP_LOGIN_SUCCESS:
            return Object.assign({}, state, {
                login: action.payload,
                error: null
            });

        case APP_LOGIN_FAIL:
            return Object.assign({}, state, {
                error: LOGIN_ERROR
            });

        case APP_SIGNUP_FAIL:
            return Object.assign({}, state, {
                error: SIGNUP_ERROR
            });

        case APP_LOGOUT:
            window.localStorage.removeItem("user");
            return Object.assign({}, state, {
                login: ""
            });
        default:
            return state;
    }
}

export default rootReducer;