package com.grabacomponent.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.grabacomponent.backend.model.Request;
import com.grabacomponent.backend.service.RequestService;

@RestController
@CrossOrigin
public class RequestController {
    @Autowired
    private RequestService service;

    @GetMapping("/request")
    public Page<Request> getRequests(@RequestParam(defaultValue = "0") int pageNo, @RequestParam(defaultValue = "10") int pageSize) {
        return service.getRequests(pageNo, pageSize);
    }

    @GetMapping("/request/{component}")
    public Page<Request> getRequestsByComponent(@PathVariable Long component, @RequestParam(defaultValue = "0") int pageNo, @RequestParam(defaultValue = "10") int pageSize) {
        return service.getRequestsByComponent(component,pageNo, pageSize);
    }

    @GetMapping("/request/{requester}")
    public Page<Request> getRequestsByRequester(@PathVariable String requester, @RequestParam(defaultValue = "0") int pageNo, @RequestParam(defaultValue = "10") int pageSize) {
        return service.getRequestsByRequester(requester,pageNo, pageSize);
    }

    @GetMapping("/request/{component}")
    public Page<Request> getOpenRequestsByComponent(@PathVariable Long component, @RequestParam(defaultValue = "0") int pageNo, @RequestParam(defaultValue = "10") int pageSize) {
        return service.getOpenRequestsByComponent(component,pageNo, pageSize);
    }

    @GetMapping("/request/{requester}")
    public Page<Request> getOpenRequestsByRequester(@PathVariable String requester, @RequestParam(defaultValue = "0") int pageNo, @RequestParam(defaultValue = "10") int pageSize) {
        return service.getOpenRequestsByRequester(requester,pageNo, pageSize);
    }

}
