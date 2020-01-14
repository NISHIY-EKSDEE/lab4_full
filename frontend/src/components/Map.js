import * as React from "react";
import {addPoint} from "../js/actions";
import { connect } from "react-redux";
import $ from "jquery";

class Map extends React.Component{

    componentDidMount() {
        this.canvas = this.refs.canvas;
        this.drawMap();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        this.drawMap();
    }

    constructor(props){
        super(props);
        this.mapOnClick = this.mapOnClick.bind(this);
    }



    render(){
        return(
        <div id={"map"}>
            <canvas id="canvas" ref="canvas" height="400px" width="400px" onClick={this.mapOnClick}/>
        </div>
        );
    }

    mapOnClick(e){
        let offset = $("#canvas").offset();
        let r = this.props.r.toString();
        let x = ((e.pageX - offset.left - 200) / 35).toString();
        let y = (-1 * (e.pageY - offset.top - 200) / 35).toString();
        let username = this.props.login;
        this.props.addPoint({x, y, r, username})
    }

    drawMap(){
        const ctx = this.canvas.getContext('2d');
        this.drawBackground(ctx);
        this.drawArea(ctx);
        this.drawAxis(ctx);
        this.drawNumbers(ctx);
        if(this.props.points != null) {
            this.props.points.map((point) => {
                const color = this.checkPoint(point.x, point.y, this.props.r) ? "#00ff00" : "red";
                this.drawPoint(ctx, point.x, point.y, color);
            });
        }
    }

    drawBackground(ctx){
        ctx.fillStyle = "#ffebcd";
        ctx.fillRect(0, 0, 400, 400);
    }

    drawAxis(ctx){
        ctx.strokeStyle = "black";
        ctx.beginPath();
        ctx.moveTo(0, 200);
        ctx.lineTo(400, 200);
        ctx.lineTo(395, 195);
        ctx.moveTo(400, 200);
        ctx.lineTo(395, 205);
        ctx.moveTo(200, 400);
        ctx.lineTo(200, 0);
        ctx.lineTo(195, 5);
        ctx.moveTo(200, 0);
        ctx.lineTo(205, 5);
        ctx.stroke();
    }

    drawNumbers(ctx){
        ctx.beginPath();
        ctx.fillStyle = "black";
        ctx.strokeStyle = "black";
        ctx.fillText("0", 205, 195);
        for(let i = 0; i <= 400; i+=35){
            if(i === 175) continue;
            ctx.moveTo(i + 25, 197);
            ctx.lineTo(i + 25, 203);
            ctx.fillText((i/35 - 5).toString(), i + 23, 215);
            ctx.fillText( (-(i/35 - 5)).toString(), 207, i + 27);
            ctx.moveTo(197, i + 25);
            ctx.lineTo(203, i + 25);
        }
        ctx.stroke();
    }

    drawArea(ctx){
        const pxR = this.props.r * 35;
        ctx.strokeStyle = "black";
        ctx.fillStyle = "#3e9fdb";
        ctx.beginPath();
        ctx.moveTo(200 - pxR, 200);
        ctx.lineTo(200 - pxR, 200 + pxR);
        ctx.lineTo(200, 200 + pxR);
        ctx.lineTo(200, 200 + pxR/2);
        ctx.lineTo(200 + pxR, 200);
        ctx.lineTo(200 + pxR/2, 200);
        //ARC
        let startAngle;
        let endAngle;
        if(pxR >= 0){
            startAngle = 0;
            endAngle = 3 * Math.PI / 2;
        }else{
            startAngle = Math.PI;
            endAngle = Math.PI/2;
        }

        ctx.arc(200, 200, Math.abs(pxR/2), startAngle, endAngle, true);
        //
        ctx.moveTo(200, 200 - pxR/2);
        ctx.lineTo(200, 200);
        ctx.lineTo(200 - pxR, 200);
        ctx.fill();
        ctx.stroke();
    }

    drawPoint(ctx, x, y, color){
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(x*35 + 200, -y*35 + 200, 3, 0, 360, false);
        ctx.fill();
    }

    checkPoint(x, y, r){
        if(r > 0)
            return (
                (-r <= x && x <= 0 && -r <= y && y <= 0)
                ||(0 <= x && x <= r && -r/2 <= y && y <= 0 && y >= (x-r)/2)
                ||(0 <= x && x <= r/2 && 0 <= y && y <= r/2 && x*x + y*y <= r*r/4 )
            );
        else
            return (
                (-r >= x && x >= 0 && -r >= y && y >= 0)
                ||(0 >= x && x >= r && -r/2 >= y && y >= 0 && y <= (x-r)/2)
                ||(0 >= x && x >= r/2 && 0 >= y && y >= r/2 && x*x + y*y <= r*r/4 )
            );
    }


}

function select(state) {
    return {
        r: state.r,
        points: state.points,
        login: state.login
    };
}

export default connect(select, {addPoint})(Map);