package com.grabacomponent.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.grabacomponent.backend.model.Listing;
import com.grabacomponent.backend.repository.ListingRepo;

@Service
public class ListingService {
    @Autowired
    private ListingRepo repo;

    public Page<Listing> getListings(int pageNo, int pageSize){
        Pageable pageable=PageRequest.of(pageNo,pageSize);
        return repo.findAll(pageable);
    }
    
    public Page<Listing> getListingsByComponent(Long id, int pageNo, int pageSize){
        Pageable pageable=PageRequest.of(pageNo,pageSize);
        return repo.findByComponentId(id,pageable);
    }

    public Page<Listing> getListingsBySeller(String seller, int pageNo, int pageSize){
        Pageable pageable=PageRequest.of(pageNo,pageSize);
        return repo.findBySellerUsername(seller,pageable);
    }

    public Page<Listing> getAvailableListingsByComponent(Long id,int pageNo, int pageSize){
        Pageable pageable=PageRequest.of(pageNo,pageSize);
        return repo.findByAvailabilityTrueAndComponentId(id, pageable);
    }

    public Page<Listing> getAvailableListingsBySeller(String seller,int pageNo, int pageSize){
        Pageable pageable=PageRequest.of(pageNo,pageSize);
        return repo.findByAvailabilityTrueAndSellerUsername(seller, pageable);
    }
}
