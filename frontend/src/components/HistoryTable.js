import React from "react";
import { connect } from "react-redux";
import HistoryRow from "./HistoryRow";
import {getAllPoints} from "../js/actions";

class HistoryTable extends React.Component{

    componentDidMount(){
        let username = this.props.login;
        this.props.getAllPoints({username});
    }

render() {
        if (!this.props.points) {
            return <div className={"divWithTable"}><h1>Загрузка</h1></div>;
        }

        if (this.props.points.length === 0) {
            return <div className={"divWithTable"}><h1>Пустая история</h1></div>
        }

        return (
            <div className={"divWithTable"}>
                <table id="historyTable">
                    <thead>
                    <tr>
                        <th>X</th>
                        <th>Y</th>
                        <th>R</th>
                        <th>Result</th>
                        <th>Owner</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.props.points.map(point => {
                            return <HistoryRow point={point} key={point.id}/>;
                        })
                    }
                    </tbody>
                </table>
            </div>
        );
    }

}

function select(state) {
    return {
        points: state.points,
        login: state.login
    };
}

export default connect(
    select,
    { getAllPoints }
)(HistoryTable);
