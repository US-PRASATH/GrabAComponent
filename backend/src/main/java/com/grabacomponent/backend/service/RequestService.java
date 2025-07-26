package com.grabacomponent.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.grabacomponent.backend.model.Request;
import com.grabacomponent.backend.repository.RequestRepo;

@Service
public class RequestService {
    @Autowired
    private RequestRepo repo;

    public Page<Request> getRequests(int pageNo,int pageSize){
        Pageable pageable=PageRequest.of(pageNo,pageSize);
        return repo.findAll(pageable);
    }

    public Page<Request> getRequestsByRequester(String username,int pageNo,int pageSize){
        Pageable pageable=PageRequest.of(pageNo,pageSize);
        return repo.findByRequesterUsername(username,pageable);
    }

    public Page<Request> getRequestsByComponent(Long id,int pageNo,int pageSize){
        Pageable pageable=PageRequest.of(pageNo,pageSize);
        return repo.findByComponentId(id,pageable);
    }

    public Page<Request> getOpenRequestsByComponent(Long id,int pageNo,int pageSize){
        Pageable pageable=PageRequest.of(pageNo,pageSize);
        return repo.findByIsOpenTrueAndComponentId(id,pageable);
    }

    public Page<Request> getOpenRequestsByRequester(String username,int pageNo,int pageSize){
        Pageable pageable=PageRequest.of(pageNo,pageSize);
        return repo.findByIsOpenTrueAndRequesterUsername(username,pageable);
    }
}
