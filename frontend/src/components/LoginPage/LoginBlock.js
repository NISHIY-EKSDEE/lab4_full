import React from "react";
import {connect} from "react-redux";
import {InputText} from "primereact/inputtext";
import {signIn, signUp} from "../../js/actions";
import ErrorMessage from "../ErrorMessage";
import {LOGIN_ERROR, LOGIN_ERROR_MESSAGE, SIGNUP_ERROR, SIGNUP_ERROR_MESSAGE} from "../../js/constants/others";
import {Password} from "primereact/password";
import {Button} from "primereact/button";

class LoginBlock extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            login: "",
            password: "",
            isFormCorrect: false
        };
        this.onChangeLogin = this.onChangeLogin.bind(this);
        this.onChangePass = this.onChangePass.bind(this);
    }

    onChangeLogin = (e)=>{
        this.setState({login: e.target.value.replace(" ", "")});
};

    onChangePass = (e)=>{
        this.setState({password: e.target.value});
    };

    render() {
        let errorMessage;
        switch(this.props.error){
            case LOGIN_ERROR:
                errorMessage = <ErrorMessage message={LOGIN_ERROR_MESSAGE}/>;
                break;
            case SIGNUP_ERROR:
                errorMessage = <ErrorMessage message={SIGNUP_ERROR_MESSAGE}/>;
                break;
            default:
                errorMessage = <ErrorMessage/>;
        }

        return(
            <div className="main">
                <h2>Логин</h2>
                <InputText value={this.state.login}
                       onChange={this.onChangeLogin}/>
                <h2>Пароль</h2>
                <Password value={this.state.password}
                       onChange={this.onChangePass}/>
                <br/>
                {errorMessage}
                <Button className="submit-button" disabled={this.state.login === "" || this.state.password === ""}
                        onClick={this.sendLoginRequest} label="Войти"/>
                <Button className="submit-button" disabled={this.state.login === "" || this.state.password === ""}
                        onClick={this.sendRegisterRequest} label="Зарегистрироваться"/>
            </div>
        )
    }

    sendLoginRequest = ()=>{
        let login = this.state.login;
        let password = this.state.password;
        let history = this.props.history;
        this.props.signIn({login, password, history})
    };

    sendRegisterRequest = ()=>{
        let login = this.state.login;
        let password = this.state.password;
        let history = this.props.history;
        this.props.signUp({login, password, history})
    };


}

function select(state) {
    return {
        error: state.error
    };
}

export default connect(select, {signIn, signUp})(LoginBlock);