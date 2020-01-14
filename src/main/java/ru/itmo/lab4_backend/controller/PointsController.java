package ru.itmo.lab4_backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import ru.itmo.lab4_backend.AreaChecker;
import ru.itmo.lab4_backend.model.Point;
import ru.itmo.lab4_backend.model.User;
import ru.itmo.lab4_backend.repository.PointRepository;
import ru.itmo.lab4_backend.repository.UserRepository;
import ru.itmo.lab4_backend.request.PointRequest;
import ru.itmo.lab4_backend.response.AllPointsResponse;
import ru.itmo.lab4_backend.response.BaseResponse;
import ru.itmo.lab4_backend.response.PointResponse;

import java.util.ArrayList;

@RestController
public class PointsController {
    private final String SUCCESS_STATUS = "success";
    private final String ERROR_STATUS = "error";

    @Autowired
    private PointRepository pointRepo;
    @Autowired
    private UserRepository userRepo;

    @RequestMapping("/api/points")
    public BaseResponse allPoints(@RequestParam String username){
        AllPointsResponse response = new AllPointsResponse();
        User user = userRepo.findByUsername(username);
        if(user != null){
            response.setPoints(
                    new ArrayList<>(pointRepo.findAllByOwner(user))
            );
            response.setStatus(SUCCESS_STATUS);
            response.setCode(HttpStatus.OK.value());
        }else{
            response.setStatus(ERROR_STATUS);
            response.setCode(HttpStatus.BAD_REQUEST.value());
        }
        return response;
    }

    @PostMapping("/api/add_point")
    public PointResponse addPoint(
            @RequestBody PointRequest request){
        Double x = request.getX();
        Double y = request.getY();
        Double r = request.getR();
        String username = request.getUsername();

        PointResponse response;
        User uOwner = userRepo.findByUsername(username);
        if( uOwner == null){
            response = new PointResponse(ERROR_STATUS, HttpStatus.BAD_REQUEST.value());
        }else {
            x = Math.round(x*1000.0) / 1000.0;
            y = Math.round(y*1000.0) / 1000.0;
            Point point = new Point(x, y, r, uOwner);
            point.setResult(AreaChecker.checkPoint(point));
            pointRepo.save(point);
            response = new PointResponse(SUCCESS_STATUS, HttpStatus.OK.value(), point);
        }
        return response;
    }

    private boolean isAuthorized(String login){
        return userRepo.findByUsername(login) != null;
    }

}
