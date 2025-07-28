package com.grabacomponent.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

import com.grabacomponent.backend.model.User;
import com.grabacomponent.backend.service.UserService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;

@RestController
@CrossOrigin
public class UserController {
    @Autowired
    private UserService service;

    @PostMapping("/user")
    public void postUser(@RequestBody User data) {
        service.addUser(data);
    }

    @PutMapping("/user/{id}")
    public void putMethodName(@PathVariable Long id, @RequestBody User data) {
        service.updateUser(id, data);
    }

    @GetMapping("/user/{username}")
    public User getMethodName(@PathVariable String username) {
        return service.getUserByUsername(username);
    }
}
