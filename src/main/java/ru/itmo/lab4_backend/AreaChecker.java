package ru.itmo.lab4_backend;

import ru.itmo.lab4_backend.model.Point;

public class AreaChecker {

    public AreaChecker(){ }

    public static boolean checkPoint(Point point){
        double x = point.getX();
        double y = point.getY();
        double r = point.getR();
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
