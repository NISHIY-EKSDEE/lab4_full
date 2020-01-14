import {applyMiddleware, compose, createStore} from "redux";
import rootReducer from "../reducers/index";
import thunk from "redux-thunk";
import loginMiddleware from "../middleware";

const storeEnhancers = compose;

const store = createStore(
    rootReducer,
    storeEnhancers(applyMiddleware(loginMiddleware, thunk))
);

export default store;