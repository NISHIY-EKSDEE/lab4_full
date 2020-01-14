package ru.itmo.lab4_backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import ru.itmo.lab4_backend.model.User;
import ru.itmo.lab4_backend.repository.UserRepository;
import ru.itmo.lab4_backend.request.UserRequest;
import ru.itmo.lab4_backend.response.BaseResponse;

@EnableWebSecurity
@RestController
public class UserController {

    private final String SUCCESS_STATUS = "success";
    private final String ERROR_STATUS = "error";

    private BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
    @Autowired
    private UserRepository userRepo;

    @PostMapping("/api/sign_up")
    public BaseResponse signUp(
            @RequestBody UserRequest request){
        String login = request.getLogin();
        String pass = request.getPassword();

        BaseResponse response;

        if (userRepo.findByUsername(login) == null) {
            User user = new User(login, pass);
            userRepo.save(user);
            response = new BaseResponse(SUCCESS_STATUS, HttpStatus.OK.value());
        }else {
            response = new BaseResponse(ERROR_STATUS, HttpStatus.BAD_REQUEST.value());
        }
        return response;
    }


    @PostMapping("/api/login")
    public BaseResponse login(
            @RequestBody UserRequest request){
        String login = request.getLogin();
        String pass = request.getPassword();
        User user = userRepo.findByUsername(login);
        BaseResponse response;
        if(user != null && encoder.matches(pass,user.getPassword())){
            response = new BaseResponse(SUCCESS_STATUS, HttpStatus.OK.value());
        }else {
            response = new BaseResponse(ERROR_STATUS, HttpStatus.BAD_REQUEST.value());
        }
        return response;
    }


    @PostMapping("/success")
    public BaseResponse success(){
        return new BaseResponse(SUCCESS_STATUS,HttpStatus.OK.value());
    }

    @PostMapping("/error")
    public BaseResponse error(){
        return new BaseResponse(ERROR_STATUS, HttpStatus.BAD_REQUEST.value());
    }
}
