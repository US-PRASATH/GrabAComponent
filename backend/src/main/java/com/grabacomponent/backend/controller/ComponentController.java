package com.grabacomponent.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.grabacomponent.backend.model.Component;
import com.grabacomponent.backend.model.Request;
import com.grabacomponent.backend.service.ComponentService;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;



@RestController
@CrossOrigin
@RequestMapping("/components")
public class ComponentController {
    @Autowired
    private ComponentService service;
    
    @GetMapping
    public Page<Component> getComponents(@RequestParam(defaultValue = "0") int pageNo, @RequestParam(defaultValue = "10") int pageSize) {
        return service.getComponents(pageNo, pageSize);
    }

    @GetMapping("/search")
    public Page<Component> searchComponents(
        @RequestParam(required = false) String name,
        @RequestParam(required = false) String type,
        @RequestParam(defaultValue = "0") int pageNo,
        @RequestParam(defaultValue = "10") int pageSize
    ) {
        return service.getFilteredComponents(type, name, pageNo, pageSize);
    }

    @GetMapping("/{id}")
    public Component getComponentById(@RequestParam Long id) {
        return service.getComponentById(id);
    }

    @PostMapping
    public void postComponents(@RequestBody List<Component> entities) {
        service.addComponents(entities);
    }
    
}
