import React, {Component} from 'react';
import './App.scss';
import {Route, Switch} from "react-router-dom";
import LoginPage from "./components/LoginPage/LoginPage";
import MainPage from "./components/MainPage/MainPage";

class App extends Component {

    state = {};

    componentDidMount() {
    }

render() {
        return (
            <div className="App">
                <Switch>
                    <Route exact path="/login" component={LoginPage}/>
                    <Route path="/" component={MainPage}/>
                </Switch>
            </div>
        );
}

}

export default App;
