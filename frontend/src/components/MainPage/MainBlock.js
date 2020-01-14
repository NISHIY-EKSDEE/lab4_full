import React from "react";
import InputArea from "../InputArea";
import HistoryTable from "../HistoryTable";
import Map from "../Map";
import store from "../../js/store";
import {APP_LOGOUT} from "../../js/constants/action-types";
import {connect} from "react-redux";
import {Button} from "primereact/button";
import {getAllPoints} from "../../js/actions";

class MainBlock extends React.Component{
    constructor(props){
        super(props);
        this.state ={};
        this.logout = this.logout.bind(this);
    }

    componentDidMount() {
        if(this.props.login == null || this.props.login === "")
            this.props.history.push("/login");
        else
            if(this.props.history.location !== "/")
                this.props.history.push("/");

        this.intervalId = setInterval(this.timer.bind(this), 5000);
    }

    componentWillUnmount(){
        clearInterval(this.intervalId);
    }

    timer(){
        let username = this.props.login;
        this.props.getAllPoints({username});
    }

    render() {
        return(
            <div className="main">
                <div className={"info"}>
                    <h3>Пользователь: {this.props.login}</h3>
                    <Button onClick={this.logout} label={"Выйти"}/>
                <InputArea/>
                </div>
                <Map/>
                <HistoryTable/>
            </div>
        )
    }

    logout(){
        store.dispatch({
            type: APP_LOGOUT
        });
        this.props.history.push("/login");
    }


}

function select(state) {
    return {
        login: state.login
    };
}

export default connect(select, { getAllPoints })(MainBlock);
