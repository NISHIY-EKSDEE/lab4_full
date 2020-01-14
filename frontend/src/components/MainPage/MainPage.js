import React from "react";
import {withRouter} from "react-router-dom";
import MainBlock from "./MainBlock";


const MainPage = withRouter((props)=>{
    return(<MainBlock history={props.history}/>)
});

export default MainPage;