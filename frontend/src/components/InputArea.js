import React, {Component} from "react";
import {Slider} from "primereact/slider";
import {InputText} from "primereact/inputtext";
import { connect } from "react-redux";
import {addPoint} from "../js/actions";
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import store from "../js/store";
import {APP_CHANGE_R} from "../js/constants/action-types";
import {Button} from "primereact/button";
import ErrorMessage from "./ErrorMessage";

class InputArea extends Component{

    initDefault = {
        valX: 0,
        valY: "",
        valR: 0,
        isYCorrect: false
    };

    constructor(props){
        super(props);
        this.state = this.initDefault;
        this.onChangeSliderX = this.onChangeSliderX.bind(this);
        this.onChangeTextY = this.onChangeTextY.bind(this);
        this.onChangeSliderR = this.onChangeSliderR.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    onChangeSliderX(e){
        this.setState({valX: e.value})
    }

    onChangeTextY(e){
        let text = e.target.value;
        let result = (text.match(/[+-]?([0-9]*[.])?[0-9]+/) && text >= -3 && text <= 3);
        this.setState({isYCorrect : result});
        this.setState({valY: e.target.value})
    }

    onChangeSliderR(e){
        this.setState({valR: e.value});
        store.dispatch({
            type: APP_CHANGE_R,
            payload: e.value
        })
    }

    handleSubmit(e) {
        e.preventDefault();
        if (this.state.isYCorrect) {
        let x = this.state.valX.toString();
        let y = this.state.valY;
        let r = this.state.valR.toString();
        let username = this.props.login;
        this.props.addPoint({x, y, r, username});
        }
    }

    render(){
        let errorMessage;
        if (!this.state.isYCorrect)
            errorMessage = <ErrorMessage message='Y должен быть числом от -3.0 до 3.0'/>;
        else errorMessage = <ErrorMessage/>;
        return(
            <div id={"inputArea"}>
                <form onSubmit={this.handleSubmit}>
                    <h3 className={"coordinateLabel"}>X: {this.state.valX}</h3>
                    <Slider className={"coordinateInput slider"}
                            value={this.state.valX}
                            onChange={this.onChangeSliderX}
                            min={-5} max={3}
                            style={{width: '14em'}}/>

                    <h3 className={"coordinateLabel"}>Введите Y</h3>
                    <InputText className={"coordinateInput slider"}
                               value={this.state.valY}
                               onChange={this.onChangeTextY}/>
                    {errorMessage}
                    <h3 className={"coordinateLabel"}>R: {this.state.valR}</h3>
                    <Slider className={"coordinateInput slider"}
                            value={this.state.valR}
                            onChange={this.onChangeSliderR}
                            min={-5} max={3}/>
                            <br/>

                    <Button type={"submit"} label={"Добавить"}/>
                </form>
            </div>
        )
    }
}

function select(state) {
    return {
        login: state.login
    };
}

export default connect(select, { addPoint })(InputArea);

