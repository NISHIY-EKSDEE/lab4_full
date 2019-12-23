package ru.itmo.lab4_backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import ru.itmo.lab4_backend.AreaChecker;
import ru.itmo.lab4_backend.model.Point;
import ru.itmo.lab4_backend.model.User;
import ru.itmo.lab4_backend.repository.PointRepository;

import java.util.Map;

@Controller
public class MainController {

    @Autowired
    PointRepository pointRepository;

    @PostMapping("add_point")
    public String addPoint(
            @AuthenticationPrincipal User user,
            @RequestParam String x,
            @RequestParam String y,
            @RequestParam String r,
            Map<String, Object> model){
        Double dX;
        Double dY;
        Double dR;

        try {
            dX = Double.parseDouble(x);
            dY = Double.parseDouble(y);
            dR = Double.parseDouble(r);
        } catch (NumberFormatException e) {
            return "main";
        }

        Point point = new Point(dX, dY, dR, user);
        point.setResult(AreaChecker.checkPoint(point));
        pointRepository.save(point);
        Iterable<Point> points = pointRepository.findAll();
        model.put("points", points);
        return "main";
    }

    @RequestMapping(value = "/main")
    public String main(Map<String, Object> model){
        Iterable<Point> points = pointRepository.findAll();
        model.put("points", points);
        return "main";
    }
}
