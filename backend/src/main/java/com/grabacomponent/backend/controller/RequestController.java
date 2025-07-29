package com.grabacomponent.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.grabacomponent.backend.model.Request;
import com.grabacomponent.backend.service.RequestService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@CrossOrigin
@RequestMapping("/requests")
public class RequestController {
    @Autowired
    private RequestService service;

    @GetMapping
    public Page<Request> getRequests(@RequestParam(defaultValue = "0") int pageNo, @RequestParam(defaultValue = "10") int pageSize) {
        return service.getRequests(pageNo, pageSize);
    }

    @GetMapping("/search")
    public Page<Request> searchRequests(
        @RequestParam(required = false) Long component,
        @RequestParam(required = false) String requester,
        @RequestParam(required = false) Boolean isOpen,
        @RequestParam(defaultValue = "0") int pageNo,
        @RequestParam(defaultValue = "10") int pageSize
    ) {
        return service.getFilteredRequests(component, requester, isOpen, pageNo, pageSize);
    }

    @PostMapping
    public void postRequests(@RequestBody List<Request> entities) {
        service.addRequests(entities);
    }
    
}
