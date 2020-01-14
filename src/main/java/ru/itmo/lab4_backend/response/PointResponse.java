package ru.itmo.lab4_backend.response;

import ru.itmo.lab4_backend.model.Point;

public class PointResponse extends BaseResponse {
    private Point point;


    public PointResponse(String status, Integer code){
        super(status, code);
    }

    public PointResponse(String status, Integer code, Point point){
        super(status, code);
        this.point = point;
    }

    public Point getPoint() {
        return point;
    }

    public void setPoint(Point point) {
        this.point = point;
    }
}
