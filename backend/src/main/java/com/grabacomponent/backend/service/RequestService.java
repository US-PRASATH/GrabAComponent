package com.grabacomponent.backend.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import com.grabacomponent.backend.spec.RequestSpecifications;
import org.springframework.data.jpa.domain.Specification;

import com.grabacomponent.backend.model.Request;
import com.grabacomponent.backend.repository.RequestRepo;

import jakarta.persistence.EntityNotFoundException;

@Service
public class RequestService {
    @Autowired
    private RequestRepo repo;

    public void addRequest(Request request){
        repo.save(request);
    }

    public void addRequests(List<Request> requests){
        repo.saveAll(requests);
    }

    public Page<Request> getRequests(int pageNo,int pageSize){
        Pageable pageable=PageRequest.of(pageNo,pageSize);
        return repo.findAll(pageable);
    }

    

    public Page<Request> getFilteredRequests(Long componentId, String requesterUsername, Boolean isOpen, int pageNo, int pageSize) {
        Pageable pageable = PageRequest.of(pageNo, pageSize);
        
        Specification<Request> spec = Specification
                .where(RequestSpecifications.hasComponent(componentId))
                .and(RequestSpecifications.hasRequester(requesterUsername))
                .and(RequestSpecifications.isOpen(isOpen));
        
        return repo.findAll(spec, pageable);
    }

    
    public Request getRequestById(Long id){
        Optional<Request> optionalRequest = repo.findById(id);
        if(optionalRequest.isPresent()){
            Request existingRequest = optionalRequest.get();
            return existingRequest;
        }
        else{
            throw new EntityNotFoundException("Request with ID " + id + " not found");
        }
    }

    public void updateRequestIsOpen(Long id, Boolean isOpen){
        Request existingRequest = getRequestById(id);
        existingRequest.setIsOpen(isOpen!=null ? isOpen : existingRequest.getIsOpen());
        repo.save(existingRequest);
    }

    public void updateRequest(Long id, Request request){
        Request existingRequest = getRequestById(id);
        existingRequest.setComponent(request.getComponent()!=null ? request.getComponent() : existingRequest.getComponent());
        existingRequest.setIsOpen(request.getIsOpen()!=null ? request.getIsOpen() : existingRequest.getIsOpen());
        existingRequest.setRequester(request.getRequester()!=null ? request.getRequester() : existingRequest.getRequester());
        existingRequest.setQuantity(request.getQuantity()!=null ? request.getQuantity() : existingRequest.getQuantity());
        repo.save(existingRequest);

    }
}
