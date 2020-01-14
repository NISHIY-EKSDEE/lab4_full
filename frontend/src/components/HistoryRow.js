import React from "react";

const HistoryRow = props =>{
    const point = props.point;

    return(
        <tr>
            <td>{point.x}</td>
            <td>{point.y}</td>
            <td>{point.r}</td>
            <td>{point.result.toString()}</td>
            <td>{point.owner.username}</td>
        </tr>
    );
};

export default HistoryRow;