package com.grabacomponent.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.grabacomponent.backend.model.Component;
import com.grabacomponent.backend.repository.ComponentRepo;

@Service
public class ComponentService {
    @Autowired
    private ComponentRepo repo;

    public void addComponent(Component data){
        repo.save(data);
    }

    public Page<Component> getComponents(int pageNo, int pageSize){
        Pageable pageable=PageRequest.of(pageNo,pageSize);
        return repo.findAll(pageable);
    }   
    
    public Page<Component> getComponentsByType(String type,int pageNo, int pageSize){
        Pageable pageable=PageRequest.of(pageNo,pageSize);
        return repo.findByType(type,pageable);
    }  

    public Component getComponentByName(String name){
        return repo.findByName(name);
    }
}
