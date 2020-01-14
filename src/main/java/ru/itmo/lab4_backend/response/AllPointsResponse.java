package ru.itmo.lab4_backend.response;

import ru.itmo.lab4_backend.model.Point;

import java.util.List;

public class AllPointsResponse extends BaseResponse{

    private List<Point> points;

    public List<Point> getPoints() {
        return points;
    }

    public void setPoints(List<Point> points) {
        this.points = points;
    }
}
