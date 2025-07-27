package com.grabacomponent.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.grabacomponent.backend.model.User;
import com.grabacomponent.backend.service.UserService;


@RestController
public class UserController {
    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public void register(@RequestBody User user) {
        userService.register(user);

    }

    @PostMapping("/login")
    public String login(@RequestBody User user) {

        return userService.login(user);
    }
    
    
}
