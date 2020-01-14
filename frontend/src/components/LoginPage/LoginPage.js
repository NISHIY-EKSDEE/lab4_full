import React from "react";
import {withRouter} from "react-router-dom";
import LoginBlock from "./LoginBlock";


const LoginPage = withRouter((props)=>{
    return(<LoginBlock history={props.history}/>)
});

export default LoginPage;