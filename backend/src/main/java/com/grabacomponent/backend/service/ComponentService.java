package com.grabacomponent.backend.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import com.grabacomponent.backend.model.Component;
import com.grabacomponent.backend.repository.ComponentRepo;
import com.grabacomponent.backend.spec.ComponentSpecifications;

import jakarta.persistence.EntityNotFoundException;

@Service
public class ComponentService {
    @Autowired
    private ComponentRepo repo;

    public void addComponent(Component data){
        repo.save(data);
    }

    public void addComponents(List<Component> components){
        repo.saveAll(components);
    }

    public Page<Component> getComponents(int pageNo, int pageSize){
        Pageable pageable=PageRequest.of(pageNo,pageSize);
        return repo.findAll(pageable);
    }

    public Page<Component> getFilteredComponents(String type, String name, int pageNo, int pageSize){
        Pageable pageable = PageRequest.of(pageNo, pageSize);

        Specification<Component> spec = Specification
        .where(ComponentSpecifications.hasName(name))
        .and(ComponentSpecifications.hasType(type));

        return repo.findAll(spec, pageable);

    }
    
    public Component getComponentById(Long id){
        Optional<Component> optionalComponent = repo.findById(id);
        if(optionalComponent.isPresent()){
            Component existingComponent = optionalComponent.get();
            return existingComponent;
        }
        else{
            throw new EntityNotFoundException("Component with ID " + id + " not found");
        }
    }

    public void updateComponent(Long id, Component component){
        Component existingComponent = getComponentById(id);
        existingComponent.setName(component.getName()!=null ? component.getName() : existingComponent.getName());
        existingComponent.setDescription(component.getDescription()!=null ? component.getDescription() : existingComponent.getDescription());
        existingComponent.setType(component.getType()!=null ? component.getType() : existingComponent.getType());
        existingComponent.setImage(component.getImage()!=null ? component.getImage() : existingComponent.getImage());
        
    }


}
