package com.grabacomponent.backend.controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.grabacomponent.backend.model.Component;
import com.grabacomponent.backend.service.ComponentService;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;



@RestController
@CrossOrigin
public class ComponentController {
    @Autowired
    private ComponentService service;

    @GetMapping("/component")
    public Page<Component> getComponents(@RequestParam(defaultValue = "0") int pageNo, @RequestParam(defaultValue = "10") int pageSize) {
        return service.getComponents(pageNo, pageSize);
    }

    @GetMapping("/component/{type}")
    public Page<Component> getComponentsByType(@PathVariable String type, @RequestParam(defaultValue = "0") int pageNo, @RequestParam(defaultValue = "10") int pageSize) {
        return service.getComponentsByType(type,pageNo, pageSize);
    }

    @GetMapping("/component/{name}")
    public Component getComponentByName(@PathVariable String name) {
        return service.getComponentByName(name);
    }
    
    @PostMapping("/component")
    public void postComponent(@RequestBody Component entity) {
        service.addComponent(entity);
    }
}
